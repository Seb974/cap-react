<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Entity\Item;
use App\Entity\User;
use App\Service\Email\Email;
use App\Repository\UserRepository;
use App\Repository\CartRepository;
use App\Repository\ProductRepository;
use App\Repository\SupplierRepository;
use App\Service\PostRequest\PostRequest;
use App\Service\Serializer\CsvService;
use App\Service\Serializer\SerializerService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Service\EntityRegister\OrderRegister;

/**
 * @Route("/api")
 */
class CartController extends AbstractController
{
    /**
     * @Route("/order/new", name="new-order", methods={"POST"})
     */
    public function add(Request $request, PostRequest $postRequest, UserRepository $userRepository, ProductRepository $productRepository, SupplierRepository $supplierRepository, SerializerService $entitySerializer, CsvService $csvService, OrderRegister $orderRegister): Response
    {
        $data = $postRequest->getData($request);
        $date = $data->get('deliveryDate');
        $user = $userRepository->find($data->get('user')['id']);
        $deliveryDate = is_string($date) ? new \DateTime($date) : $date;
        $items = $this->createItemsEntities($data->get('items'), $productRepository, $supplierRepository);
        $cart = $this->createCartEntity($user, $deliveryDate, $items);

        return new JsonResponse($entitySerializer->serializeEntity($cart, 'cart'));
    }

    /**
     * @Route("/order/notify", name="order-notify", methods={"POST"})
     */
    public function notify(Request $request, PostRequest $postRequest, CartRepository $cartRepository, ProductRepository $productRepository, SupplierRepository $supplierRepository, SerializerService $entitySerializer, CsvService $csvService, OrderRegister $orderRegister, Email $mailer): Response
    {
        $itemsToNotify = [];
        $data = $postRequest->getData($request);
        $selectedItems = $data->get('selectedItems');
        $cart = $cartRepository->find($data->get('id'));

        foreach ($cart->getItems() as $item) {
            if (in_array($item->getId(), $selectedItems)) {
                $itemsToNotify[] = $item;
            } 
        }
        $orders = $orderRegister->getSuppliersOrder($itemsToNotify);
        foreach ($orders as $supplier => $items) {
            $mailer->sendOrder($cart, $items, $items[0]->getSupplier()->getEmail());
        }
        return new JsonResponse($entitySerializer->serializeEntity($cart, 'cart'));
    }

    private function createItemsEntities(array $items, ProductRepository $productRepository, SupplierRepository $supplierRepository)
    {
        $newItems = [];
        $entityManager = $this->getDoctrine()->getManager();
        foreach ($items as $item) {
            $product = $productRepository->find($item['product']['id']);
            $supplier = $supplierRepository->find($product->getMainSupplierId());
            $itemEntity = new Item();
            $itemEntity->setProduct($product)
                       ->setQuantity($item['quantity'])
                       ->setStock($item['stock'])
                       ->setSupplier($supplier);
            $entityManager->persist($itemEntity);
            $newItems[] = $itemEntity;
        }
        $entityManager->flush();
        return $newItems;
    }

    private function createCartEntity(User $user, \DateTime $deliveryDate, array $items)
    {
        $cart = new Cart();
        $ts = $deliveryDate->getTimestamp();
        $datetime = (new \DateTime())->setTimestamp($ts);
        $entityManager = $this->getDoctrine()->getManager();
        $cart->setUser($user)
             ->setStatus("WAITING")
             ->setSendingNumber(0)
             ->setDeliveryDate($datetime);
        foreach ($items as $item) {
            $cart->addItem($item);
        }
        $entityManager->persist($cart);
        $entityManager->flush();

        return $cart;
    }
}