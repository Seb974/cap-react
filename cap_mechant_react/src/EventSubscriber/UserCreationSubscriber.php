<?php

namespace App\EventSubscriber;

use App\Entity\Meta;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class UserCreationSubscriber implements EventSubscriberInterface 
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['createMeta', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function createMeta(ViewEvent $event) {
        $result = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if($result instanceof User && $method === "POST") {
            $meta = new Meta();
            $this->em->persist($meta);
            $result->setMetas($meta);
        }
    }
}