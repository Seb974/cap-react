<?php

namespace App\Service\EntityRegister;

use App\Entity\User;
use App\Entity\Meta;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\UserRepository;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserRegister
{
    private $em;
    private $encoder;
    private $userRepository;

    public function __construct(EntityManagerInterface $em, UserRepository $userRepository, UserPasswordEncoderInterface $encoder)
    {
        $this->em = $em;
        $this->encoder = $encoder;
        $this->userRepository = $userRepository;
    }

    public function postUser($header, $row)
    {
        $user = intval($row[$header['ID']]) == 0 ? $this->createUser($header, $row) : $this->updateUser($header, $row);
        $this->updateMetas($user, $header, $row);
        $this->em->flush();
    }

    private function createUser($header, $row)
    {
        $user = new User();
        $clearPassword = implode("-", explode(" ", strtolower(trim($row[$header['LIBELLE']]))));
        $hash = $this->encoder->encodePassword($user, $clearPassword);
        $user->setEmail(trim($row[$header['EMAIL']]))
             ->setRoles(['ROLE_USER'])
             ->setPassword($hash)
             ->setCode(trim($row[$header['CODE CLIENT']]))
             ->setName(trim($row[$header['LIBELLE']]));
        $this->em->persist($user);
        return $user;
    }

    private function updateUser($header, $row)
    {
        $user = $this->userRepository->find( intval($row[$header['ID']]) );
        $user->setEmail(trim($row[$header['EMAIL']]))
             ->setCode(trim($row[$header['CODE CLIENT']]))
             ->setName(trim($row[$header['LIBELLE']]));
        return $user;
    }

    private function updateMetas($user, $header, $row)
    {
        $metas = $user->getMetas() != null ? $user->getMetas() : new Meta();
        $metas->setAddress(trim($row[$header['ADRESSE 1']]))
              ->setAddress2(trim($row[$header['ADRESSE 2']]))
              ->setZipcode(trim($row[$header['CODE POSTAL']]))
              ->setCity(trim($row[$header['VILLE']]));
        $this->em->persist($metas);
        $user->setMetas($metas);
    }
}