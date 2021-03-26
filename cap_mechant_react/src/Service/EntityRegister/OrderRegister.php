<?php

namespace App\Service\EntityRegister;

use App\Entity\Cart;
use App\Repository\CartRepository;

class OrderRegister
{
    private $cLabo;
    private $cocoCannelle;
    private $cartRepository;

    public function __construct($cLabo, $cocoCannelle, CartRepository $cartRepository) {
        $this->cLabo = $cLabo;
        $this->cocoCannelle = $cocoCannelle;
        $this->cartRepository = $cartRepository;
    }

    public function getInternalItems($order)
    {
        $internalProducts = [$this->cLabo => [], $this->cocoCannelle => []];
        foreach ($order->getItems() as $item) {
            $supplier = $item->getSupplier();
            if ($supplier->getIsInternal()) {
                if ( strtoupper($supplier->getName()) == $this->cLabo )
                    $internalProducts[$this->cLabo][] = $item;
                else if ( strtoupper($supplier->getName()) == $this->cocoCannelle )
                    $internalProducts[$this->cocoCannelle][] = $item;
            }
        }
        return $internalProducts;
    }

    public function getHeaderSite($site, $order)
    {
        return [
            'E',
            $order->getUser()->getName(),
            $site === $this->cLabo ? '01' : '02',
            $order->getId(),
            $order->getUser()->getCode(),
            $order->getDeliveryDate()->format('d/m/Y'), 
            (new \DateTime())->format('d/m/Y')
        ];
    }

    public function getFormattedRowItem($site, $order, $key, $item)
    {
        return [
            'L',
            $order->getUser()->getName(),
            $site === $this->cLabo ? '01' : '02',
            $order->getId(),
            $key + 1,
            $item->getProduct()->getCode(),
            $item->getQuantity() * 1000,
            strtoupper($item->getProduct()->getUnit()->getShorthand())
        ];
    }

    public function getSuppliersOrder($items)
    {
        $groupedOrders = [];
        foreach ($items as $item) {
            $supplier = $item->getSupplier();
            if ($supplier->getIsInternal() == null || $supplier->getIsInternal() == false) {
                $key = $this->getSupplierArray($supplier, $groupedOrders);
                if ($key)
                    $groupedOrders[$key][] = $item;
                else
                    $groupedOrders[$supplier->getId()][] = $item;
            }
        }
        return $groupedOrders;
    }

    private function getSupplierArray($supplier, $groupedOrders)
    {
        foreach ($groupedOrders as $key => $value) {
            if ($key === $supplier->getId())
                return $key;
        }
        return null;
    }
}