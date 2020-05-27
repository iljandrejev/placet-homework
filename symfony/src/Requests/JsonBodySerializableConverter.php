<?php


namespace App\Requests;


use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Request\ParamConverter\ParamConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

final class JsonBodySerializableConverter implements ParamConverterInterface
{
    /**
     * @var SerializerInterface
     */
    private $serializer;

    /**
     * @var ValidatorInterface
     */
    private $validator;

    public function __construct(SerializerInterface $serializer, ValidatorInterface $validator)
    {
        $this->serializer = $serializer;
        $this->validator = $validator;
    }

    /**
     * Stores the object in the request.
     *
     * @param ParamConverter $configuration Contains the name, class and options of the object
     *
     * @return bool True if the object has been successfully set, else false
     */
    public function apply(Request $request, ParamConverter $configuration)
    {
        $body = $request->getContent();

        $obj = $this->serializer->deserialize($body, $configuration->getClass(), 'json');
        $violationList = $this->validator->validate($obj);

        $request->attributes->set('_violations', $violationList);
        $request->attributes->set($configuration->getClass(), $obj);
    }

    /**
     * Checks if the object is supported.
     *
     * @return bool True if the object is supported, else false
     */
    public function supports(ParamConverter $configuration)
    {
        return true;
        $class = $configuration->getClass();
        if (!is_string($class)) {
            return false;
        }

        return in_array(JsonBodySerializableInterface::class, class_implements($class));
    }

    /**
     * {@inheritdoc}
     */
    protected function getConverterName()
    {
        return 'json_converter';
    }
}