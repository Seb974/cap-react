<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Entity\Item;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Repository\ProductRepository;
use App\Service\PostRequest\PostRequest;
use App\Service\Serializer\CsvService;
use App\Service\Serializer\SerializerService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @Route("/api")
 */
class CartController extends AbstractController
{
    /**
     * @Route("/order/new", name="new-order", methods={"POST"})
     */
    public function add(Request $request, PostRequest $postRequest, UserRepository $userRepository, ProductRepository $productRepository, SerializerService $entitySerializer, CsvService $csvService): Response
    {
        $data = $postRequest->getData($request);
        $date = $data->get('deliveryDate');
        $user = $userRepository->find($data->get('user')['id']);
        $deliveryDate = is_string($date) ? new \DateTime($date) : $date;
        $cart = $this->createCartEntity($user, $deliveryDate);
        $this->createItemsEntities($data->get('items'), $cart, $productRepository);
        $csvService->setInCsv($cart);

        return new JsonResponse($entitySerializer->serializeEntity($cart, 'cart'));
    }

    private function createItemsEntities(array $items, Cart $cart, ProductRepository $productRepository)
    {
        $entityManager = $this->getDoctrine()->getManager();
        foreach ($items as $item) {
            $product = $productRepository->find($item['product']['id']);
            $itemEntity = new Item();
            $itemEntity->setProduct($product)
                 ->setQuantity($item['quantity'])
                 ->setStock($item['stock']);
            $entityManager->persist($itemEntity);
            $cart->addItem($itemEntity);
        }
        $entityManager->flush();
    }

    private function createCartEntity(User $user, \DateTime $deliveryDate)
    {
        $cart = new Cart();
        $ts = $deliveryDate->getTimestamp();
        $datetime = (new \DateTime())->setTimestamp($ts);
        $entityManager = $this->getDoctrine()->getManager();

        $cart->setUser($user)
             ->setStatus("WAITING")
             ->setDeliveryDate($datetime);
        $entityManager->persist($cart);
        $entityManager->flush();

        return $cart;
    }
}