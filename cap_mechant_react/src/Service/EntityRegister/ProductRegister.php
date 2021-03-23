<?php

namespace App\Service\EntityRegister;

use App\Entity\Unit;
use App\Entity\Product;
use App\Repository\UnitRepository;
use App\Repository\ProductRepository;
use App\Repository\SupplierRepository;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;

class ProductRegister
{
    private $em;
    private $unitRepository;
    private $productRepository;
    private $supplierRepository;
    private $categoryRepository;
    private $defaultCategoryName;
    private $defaultUnitName;
    private $categorySelection;
    private $unitSelection;
    private $defaultSupplierName;
    private $supplierSelection;

    public function __construct($defaultCategoryName, $defaultUnitName, $categorySelection, $unitSelection, $defaultSupplierName, $supplierSelection, EntityManagerInterface $em, ProductRepository $productRepository, UnitRepository $unitRepository, SupplierRepository $supplierRepository, CategoryRepository $categoryRepository)
    {
        $this->em = $em;
        $this->unitRepository = $unitRepository;
        $this->productRepository = $productRepository;
        $this->supplierRepository = $supplierRepository;
        $this->categoryRepository = $categoryRepository;
        $this->defaultCategoryName = $defaultCategoryName;
        $this->defaultUnitName = $defaultUnitName;
        $this->categorySelection = $categorySelection;
        $this->unitSelection = $unitSelection;
        $this->defaultSupplierName = $defaultSupplierName;
        $this->supplierSelection = $supplierSelection;
    }

    public function postProduct($header, $row)
    {
        intval($row[$header['ID']]) == 0 ? $this->createProduct($header, $row) : $this->updateProduct($header, $row);
        $this->em->flush();
    }

    private function createProduct($header, $row)
    {
        $product = new Product();
        $category = $this->getDefaultEntity($this->categoryRepository, $this->categorySelection, $this->defaultCategoryName);
        $supplier = $this->getDefaultEntity($this->supplierRepository, $this->supplierSelection, $this->defaultSupplierName);
        $unit = $this->setUnit($header, $row);
        $product->setName(trim($row[$header['LIBELLE COMMERCIALE']]))
                ->setDescription("")
                ->setCategory($category)
                ->setUnit($unit)
                ->addSupplier($supplier)
                ->setMainSupplierId($supplier->getId())
                ->setIsInternal(true)
                ->setCode(trim($row[$header['CODE']]));
        $this->em->persist($product);
        return $product;
    }

    private function updateProduct($header, $row)
    {
        $unit = $this->setUnit($header, $row);
        $product = $this->productRepository->find(intval($row[$header['ID']]));
        $product->setName(trim($row[$header['LIBELLE COMMERCIALE']]))
                ->setUnit($unit)
                ->setCode(trim($row[$header['CODE']]));
        return $product;
    }

    private function getDefaultEntity($entityRepository, $criteria, $value)
    {
        return $entityRepository->findOneBy([$criteria => $value]);
    }

    private function setUnit($header, $row)
    {
        if ( $row[$header['UNITE COMMANDE']] != null && strlen($row[$header['UNITE COMMANDE']]) > 0 ) {
            $unit = $this->getUnit($row[$header['UNITE COMMANDE']]);
        } else
            $unit = $this->getDefaultEntity($this->unitRepository, $this->unitSelection, $this->defaultUnitName);
        return $unit;
    }

    private function getUnit($shorthand)
    {
        $unit = $this->unitRepository->findOneBy([$this->unitSelection => trim($shorthand)]);
        if ($unit == null) {
            $unit = new Unit();
            $unit->setName(trim($shorthand))
                 ->setShorthand(trim($shorthand));
            $this->em->persist($unit);
            $this->em->flush();
        }
        return $unit;
    }
}