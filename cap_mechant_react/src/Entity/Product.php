<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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
     * @Groups({"products_read", "items_read"})
     */
    private $unit;

    /**
     * @ORM\ManyToMany(targetEntity=Supplier::class)
     * @Groups({"products_read", "items_read"})
     */
    private $suppliers;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"products_read", "items_read"})
     */
    private $mainSupplierId;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"products_read", "items_read"})
     * @Assert\Type(
     *     type="bool",
     *     message="{{ value }} n'est pas un {{ type }} valide."
     * )
     */
    private $isInternal;

    /**
     * @ORM\Column(type="string", length=20, nullable=true)
     * @Groups({"products_read", "items_read"})
     */
    private $code;

    /**
     * @ORM\Column(type="array", nullable=true)
     * @Groups({"products_read", "items_read"})
     */
    private $userCategories = [];

    public function __construct()
    {
        $this->suppliers = new ArrayCollection();
    }

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

    /**
     * @return Collection|Supplier[]
     */
    public function getSuppliers(): Collection
    {
        return $this->suppliers;
    }

    public function addSupplier(Supplier $supplier): self
    {
        if (!$this->suppliers->contains($supplier)) {
            $this->suppliers[] = $supplier;
        }

        return $this;
    }

    public function removeSupplier(Supplier $supplier): self
    {
        $this->suppliers->removeElement($supplier);

        return $this;
    }

    public function getMainSupplierId(): ?int
    {
        return $this->mainSupplierId;
    }

    public function setMainSupplierId(?int $mainSupplierId): self
    {
        $this->mainSupplierId = $mainSupplierId;

        return $this;
    }

    public function getIsInternal(): ?bool
    {
        return $this->isInternal;
    }

    public function setIsInternal(?bool $isInternal): self
    {
        $this->isInternal = $isInternal;

        return $this;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(?string $code): self
    {
        $this->code = $code;

        return $this;
    }

    public function getUserCategories(): ?array
    {
        return $this->userCategories;
    }

    public function setUserCategories(?array $userCategories): self
    {
        $this->userCategories = $userCategories;

        return $this;
    }
}
