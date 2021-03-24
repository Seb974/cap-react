<?php

namespace App\EventSubscriber;

use App\Service\Serializer\SerializerService;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber {

    private $serializer;

    public function __construct(SerializerService $serializer)
    {
        $this->serializer = $serializer;
    }

    public function updateJwtData(JWTCreatedEvent $event) 
    {
        $user = $event->getUser();
        $data = $event->getData();
        $data['id'] = $user->getId();
        $data['name'] = $user->getName();
        $data['email'] = $user->getEmail();
        $data['code'] = $user->getCode();
        $data['metas'] = $this->serializer->serializeEntity($user->getMetas(), 'users_read');

        $event->setData($data);
    }
}