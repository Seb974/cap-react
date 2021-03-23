<?php

namespace App\Service\Serializer;

use App\Service\EntityRegister\UserRegister;
use App\Service\EntityRegister\ProductRegister;

class CsvService
{
    private $userRegister;
    private $productRegister;
    private $publicFolder;
    private $orderFileName;
    private $userFileName;
    private $productFileName;
    private $delimiter;

    public function __construct($orderFileName, $userFileName, $productFileName, $publicFolder, UserRegister $userRegister, ProductRegister $productRegister)
    {
        $this->userRegister = $userRegister;
        $this->productRegister = $productRegister;
        $this->orderFileName = $orderFileName;
        $this->userFileName = $userFileName;
        $this->productFileName = $productFileName;
        $this->publicFolder = $publicFolder;
        $this->delimiter = ",";
    }

    public function setOrderInCsv($order)
    {
        try {
            $file = fopen($this->orderFileName, 'a');
            $line = $this->getFirstLine($this->orderFileName);
            $orderArray = $this->getOrderArray($order);
            if ($line == 1)
                $this->setHeader($file);
            foreach ($orderArray as $item) {
                fputcsv($file, $item, $this->delimiter);
            }
        } catch(\Exception $e) {}
        finally {
            fclose($file);
        }
    }

    public function getUsersFromCsv()
    {
        $status = 0;
        $header = [];
        $lineNumber = 1;

        try {
            $file = fopen($this->publicFolder . $this->userFileName, 'r');
            while(($row = fgetcsv($file, 0, ";")) !== false)
            {
                if ($lineNumber <= 1) {
                    $header = $this->getHeader($row);
                } else {
                    $this->userRegister->postUser($header, $row);
                }
                $lineNumber++;
            }
        } catch( \Exception $e) {
            $status = 1;
        } finally {
            fclose($file);
            return $status;
        }
    }

    public function getProductsFromCsv()
    {
        $status = 0;
        $header = [];
        $lineNumber = 1;

        try {
            $file = fopen($this->publicFolder . $this->productFileName, 'r');
            while(($row = fgetcsv($file, 0, ";")) !== false)
            {
                if ($lineNumber <= 1) {
                    $header = $this->getHeader($row);
                } else {
                    $this->productRegister->postProduct($header, $row);
                }
                $lineNumber++;
            }
        } catch( \Exception $e) {
            $status = 1;
        } finally {
            fclose($file);
            return $status;
        }
    }

    private function getHeader($row)
    {
        $header = [];
        foreach ($row as $key => $value) {
            $header[$value] = $key;
        }
        return $header;
    }

    private function setHeader($file)
    {
        fputcsv($file, [
            'user_id',
            'user_name',
            'product_id',
            'product_name',
            'date',
            'stock',
            'quantity'
        ], $this->delimiter);
    }

    private function getOrderArray($order)
    {
        $data = [];
        foreach ($order->getItems() as $item) {
            $data[] = [
                'userId' => $order->getUser()->getId(),
                'userName' => $order->getUser()->getName(),
                'productId' => $item->getProduct()->getId(),
                'productName' => $item->getProduct()->getName(),
                'date' => $order->getDeliveryDate()->format('d/m/Y'),
                'stock' => $item->getStock(),
                'stock_unit' => $item->getProduct()->getUnit()->getShorthand(),
                'quantity' => $item->getQuantity(),
                'qty_unit' => $item->getProduct()->getUnit()->getShorthand(),
            ];
        }
        return $data;
    }

    private function getFirstLine($fileName)
    {
        return count(file($fileName, FILE_SKIP_EMPTY_LINES)) + 1;
    }
}