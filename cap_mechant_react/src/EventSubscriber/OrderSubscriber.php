<?php

namespace App\EventSubscriber;

use App\Entity\Cart;
use Doctrine\ORM\Events;
use App\Service\Email\Email;
use Doctrine\Common\EventSubscriber;
use App\Service\Serializer\CsvService;
use App\Service\EntityRegister\OrderRegister;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class OrderSubscriber implements EventSubscriber
{
    private $orderRegister;
    private $mailer;
    private $csvWriter;

    public function __construct(OrderRegister $orderRegister, Email $mailer, CsvService $csvWriter)
    {
        $this->mailer = $mailer;
        $this->csvWriter = $csvWriter;
        $this->orderRegister = $orderRegister;
    }

    public function getSubscribedEvents(): array
    {
        return [
            Events::postPersist,
            Events::postRemove,
            Events::postUpdate,
        ];
    }
    public function postPersist(LifecycleEventArgs $args): void
    {
        $this->logActivity('persist', $args);
    }

    public function postRemove(LifecycleEventArgs $args): void
    {
        $this->logActivity('remove', $args);
    }

    public function postUpdate(LifecycleEventArgs $args): void
    {
        $this->logActivity('update', $args);
    }

    private function logActivity(string $action, LifecycleEventArgs $args): void
    {
        $entity = $args->getObject();

        if ($action != 'update' || !$entity instanceof Cart || ($entity instanceof Cart && $entity->getSendingNumber() > 1)) {
            return;
        }

        $orders = $this->orderRegister->getSuppliersOrder($entity->getItems());
        foreach ($orders as $supplier => $items) {
            $this->mailer->sendOrder($entity, $items, $items[0]->getSupplier()->getEmail());
        }
        $this->csvWriter->setOrderInCsv($entity);
    }
}