<?php

namespace App\Service\Serializer;

use App\Service\EntityRegister\UserRegister;
use App\Service\EntityRegister\OrderRegister;
use App\Service\EntityRegister\ProductRegister;

class CsvService
{
    private $userRegister;
    private $orderRegister;
    private $productRegister;
    private $publicFolder;
    private $orderFileName;
    private $userFileName;
    private $productFileName;
    private $delimiter;

    public function __construct($orderFileName, $userFileName, $productFileName, $publicFolder, UserRegister $userRegister, ProductRegister $productRegister, OrderRegister $orderRegister)
    {
        $this->userRegister = $userRegister;
        $this->orderRegister = $orderRegister;
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
            $internalItems = $this->orderRegister->getInternalItems($order);
            foreach ($internalItems as $site => $items) {
                $this->setHeader($file, $site, $order);
                foreach ($items as $key => $item) {
                    $formattedItem = $this->orderRegister->getFormattedRowItem($site, $order, $key, $item);
                    fputcsv($file, $formattedItem, $this->delimiter);
                }
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

    private function setHeader($file, $site, $order)
    {
        $header = $this->orderRegister->getHeaderSite($site, $order);
        fputcsv($file, $header, $this->delimiter);
    }
}