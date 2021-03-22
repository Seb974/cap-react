<?php

namespace App\Service\Serializer;

use Symfony\Component\HttpFoundation\Response;

class CsvService
{
    private $publicFolder;
    private $fileName;
    private $userFileName;
    private $productFileName;
    private $delimiter;

    public function __construct($fileName, $publicFolder)
    {
        $this->fileName = $fileName;
        $this->publicFolder = $publicFolder;
        $this->delimiter = ",";
    }

    public function setInCsv($order)
    {
        try {
            $file = fopen($this->fileName, 'a');
            $line = $this->getFirstLine();
            $orderArray = $this->getOrderArray($order);
            if ($line == 1)
                $this->setTitles($file);
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
        $file = fopen($this->publicFolder . $this->fileName, 'r');
        $lineNumber = 1;

        while (($raw_string = fgets($file)) !== false)
        {
            $row = str_getcsv($raw_string);
            // dump($row);
            $lineNumber++;
        }
        // dump($lineNumber);
        fclose($file);
        return $lineNumber;
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

    private function setTitles($file)
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

    private function getFirstLine()
    {
        return count(file($this->fileName, FILE_SKIP_EMPTY_LINES)) + 1;
    }
}