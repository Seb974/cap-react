<?php

namespace App\Service\EntityRegister;

class OrderRegister
{
    private $cLabo;
    private $cocoCannelle;

    public function __construct($cLabo, $cocoCannelle) {
        $this->cLabo = $cLabo;
        $this->cocoCannelle = $cocoCannelle;
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
}