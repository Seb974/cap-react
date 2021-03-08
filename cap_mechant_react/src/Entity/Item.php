<?php

namespace App\Entity;

use App\Repository\ItemRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ItemRepository::class)
 * @ApiResource(
 *     denormalizationContext={"disable_type_enforcement"=true},
 *     normalizationContext={
 *          "groups"={"items_read"}
 *     },
 *     collectionOperations={"GET", "POST"},
 *     itemOperations={"GET", "PUT", "PATCH", "DELETE"}
 * )
 */
class Item
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"items_read", "carts_read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Product::class)
     * @Groups({"items_read", "carts_read"})
     * @Assert\NotNull(message="Un produit est obligatoire.")
     */
    private $product;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"items_read", "carts_read"})
     */
    private $quantity;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"items_read", "carts_read"})
     */
    private $stock;

    /**
     * @ORM\ManyToOne(targetEntity=Cart::class, inversedBy="items")
     */
    private $cart;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): self
    {
        $this->product = $product;

        return $this;
    }

    public function getQuantity(): ?float
    {
        return $this->quantity;
    }

    public function setQuantity(?float $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getStock(): ?float
    {
        return $this->stock;
    }

    public function setStock(?float $stock): self
    {
        $this->stock = $stock;

        return $this;
    }

    public function getCart(): ?Cart
    {
        return $this->cart;
    }

    public function setCart(?Cart $cart): self
    {
        $this->cart = $cart;

        return $this;
    }
}
