<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SupplierRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=SupplierRepository::class)
 * @ApiResource(
 *     denormalizationContext={"disable_type_enforcement"=true},
 *     normalizationContext={
 *          "groups"={"suppliers_read"}
 *     },
 *     collectionOperations={"GET", "POST"},
 *     itemOperations={"GET", "PUT", "PATCH", "DELETE"}
 * )
 */
class Supplier
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"suppliers_read", "products_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"suppliers_read", "products_read"})
     * @Assert\NotBlank(message="Un nom est obligatoire.")
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=120, nullable=true)
     * @Groups({"suppliers_read", "products_read"})
     * @Assert\Email(message="L'adresse email saisie n'est pas valide.")
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=20, nullable=true)
     * @Groups({"suppliers_read", "products_read"})
     * @Assert\Regex(
     *     pattern="/^(?:(?:\+|00)262|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/",
     *     match=true,
     *     message="Le numéro de téléphone saisi n'est pas valide."
     * )
     */
    private $phone;

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

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }
}
