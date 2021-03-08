<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ProductRepository::class)
 * @ApiResource(
 *     denormalizationContext={"disable_type_enforcement"=true},
 *     normalizationContext={
 *          "groups"={"products_read"}
 *     },
 *     collectionOperations={"GET", "POST"},
 *     itemOperations={"GET", "PUT", "PATCH", "DELETE"}
 * )
 */
class Product
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"products_read", "items_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"products_read", "items_read"})
     * @Assert\NotBlank(message="Un nom est obligatoire.")
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"products_read", "items_read"})
     */
    private $description;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class)
     * @Groups({"products_read", "items_read"})
     * @Assert\NotNull(message="Une catégorie est obligatoire.")
     */
    private $category;

    /**
     * @ORM\OneToOne(targetEntity=Picture::class, cascade={"persist", "remove"})
     * @Groups({"products_read"})
     */
    private $picture;

    /**
     * @ORM\ManyToOne(targetEntity=Unit::class)
     * @Groups({"products_read"})
     */
    private $unit;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getPicture(): ?Picture
    {
        return $this->picture;
    }

    public function setPicture(?Picture $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getUnit(): ?Unit
    {
        return $this->unit;
    }

    public function setUnit(?Unit $unit): self
    {
        $this->unit = $unit;

        return $this;
    }
}
