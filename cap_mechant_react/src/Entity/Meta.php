<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MetaRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=MetaRepository::class)
 * @ApiResource(
 *     denormalizationContext={"disable_type_enforcement"=true},
 *     normalizationContext={
 *          "groups"={"metas_read"}
 *     },
 *     collectionOperations={"GET", "POST"},
 *     itemOperations={"GET", "PUT", "PATCH", "DELETE"}
 * )
 */
class Meta
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"metas_read", "users_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"metas_read", "users_read"})
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"metas_read", "users_read"})
     */
    private $address2;

    /**
     * @ORM\Column(type="string", length=10, nullable=true)
     * @Groups({"metas_read", "users_read"})
     * @Assert\Regex(
     *     pattern="/^(?:[0-9]\d|9[0-8])\d{3}$/",
     *     match=true,
     *     message="Le code postal saisi n'est pas valide."
     * )
     */
    private $zipcode;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"metas_read", "users_read"})
     */
    private $city;

    /**
     * @ORM\Column(type="array", nullable=true)
     * @Groups({"metas_read", "users_read"})
     */
    private $position = [];

    /**
     * @ORM\Column(type="string", length=15, nullable=true)
     * @Groups({"metas_read", "users_read"})
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

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getAddress2(): ?string
    {
        return $this->address2;
    }

    public function setAddress2(?string $address2): self
    {
        $this->address2 = $address2;

        return $this;
    }

    public function getZipcode(): ?string
    {
        return $this->zipcode;
    }

    public function setZipcode(?string $zipcode): self
    {
        $this->zipcode = $zipcode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getPosition(): ?array
    {
        return $this->position;
    }

    public function setPosition(?array $position): self
    {
        $this->position = $position;

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
