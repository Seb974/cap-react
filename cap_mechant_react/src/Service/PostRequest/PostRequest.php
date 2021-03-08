<?php

namespace App\Service\PostRequest;

use Symfony\Component\HttpFoundation\Request;

class PostRequest
{
    public function getData(Request $request) {
        if (strpos($request->headers->get('Content-Type'), 'application/json') === 0) {
            $data = json_decode($request->getContent(), true);
            $request->request->replace(is_array($data) ? $data : array());
        }
        return $request->request;
    }

    public function getServerState(Request $request) {
        $serverState = 1;
        if ( $request->headers->get('Server-state') !== null ) {
            $serverState = intval($request->headers->get('Server-state'));
        }
        return $serverState;
    }
}