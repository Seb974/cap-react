<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FullDesignController extends AbstractController
{
    #[Route('/fulldesign', name: 'full_design')]
    public function index(): Response
    {
        return $this->render('full_design/index.html.twig', [
            'controller_name' => 'FullDesignController',
        ]);
    }
}
