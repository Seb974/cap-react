<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\UnitRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=UnitRepository::class)
 * @ApiResource(
 *     denormalizationContext={"disable_type_enforcement"=true},
 *     normalizationContext={
 *          "groups"={"units_read"}
 *     },
 *     collectionOperations={"GET", "POST"},
 *     itemOperations={"GET", "PUT", "PATCH", "DELETE"}
 * )
 */
class Unit
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"products_read", "units_read", "items_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"products_read", "units_read", "items_read"})
     * @Assert\NotNull(message="Un nom est obligatoire.")
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"products_read", "units_read", "items_read"})
     * @Assert\NotNull(message="L'abréviation est obligatoire.")
     */
    private $shorthand;

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

    public function getShorthand(): ?string
    {
        return $this->shorthand;
    }

    public function setShorthand(?string $shorthand): self
    {
        $this->shorthand = $shorthand;

        return $this;
    }
}
