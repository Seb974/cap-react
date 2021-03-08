<?php

namespace App\Service\Serializer;

use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Serializer\Serializer;
use Doctrine\Common\Annotations\AnnotationReader;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\PropertyInfo\Extractor\ReflectionExtractor;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;


class SerializerService
{
    private $classMetadataFactory;
    private $normalizer;
    private $encoder;
    private $serializer;

    public function __construct()
    {
        $this->classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
        $this->normalizer = new ObjectNormalizer($this->classMetadataFactory, null, null, new ReflectionExtractor());
        $this->encoder = new JsonEncoder();
        $this->serializer = new Serializer([new DateTimeNormalizer(), $this->normalizer], [$this->encoder]);

    }

    public function serializeEntity($object, string $group)
    {
        $data = $this->serializer->normalize($object, null, ['groups' => $group]);
        return $data;
    }
}