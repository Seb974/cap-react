<?php

namespace App\Controller;

use App\Service\Serializer\CsvService;
use Symfony\Component\HttpFoundation\JsonResponse;


use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AppController extends AbstractController
{
    /**
     * @Route("/", name="app")
     */
    public function index(): Response
    {
        return $this->render('app/index.html.twig', []);
    }

    /**
     * @Route("/read", name="read-test", methods={"GET"})
     */
    public function read(CsvService $csvService): Response
    {
        $csvService->getUsersFromCsv();
        return new JsonResponse(['read' => true]);
    }
}
