<?php

namespace App\Requests;
use Symfony\Component\Validator\Constraints as Assert;


class CustomerRequest implements JsonBodySerializableInterface
{


    /**
     * @Assert\NotBlank(message="Firstname is required and should not be blank")
     * @Assert\Type("string")
     *
     * @var string
     */
    public $firstname;
    /**
     * @Assert\NotBlank
     * @Assert\Type("string")
     *
     * @var string
     */
    public $lastname;
    /**
     * @Assert\NotBlank
     * @Assert\Email(message="The email '{{ value }}' is not a valid email.")
     * @Assert\Type("string")
     *
     * @var string
     */
    public $email;
    /**
     * @Assert\NotBlank
     * @Assert\Type("string")
     *
     * @var string
     */
    public $education;
    /**
     * @Assert\Type("boolean")
     *
     * @var boolean
     */
    public $agreement;

    /**
     * @return string
     */
    public function getFirstname(): string
    {
        return $this->firstname;
    }

    /**
     * @param string $firstname
     * @return CustomerRequest
     */
    public function setFirstname(string $firstname): CustomerRequest
    {
        $this->firstname = $firstname;
        return $this;
    }

    /**
     * @return string
     */
    public function getLastname(): string
    {
        return $this->lastname;
    }

    /**
     * @param string $lastname
     * @return CustomerRequest
     */
    public function setLastname(string $lastname): CustomerRequest
    {
        $this->lastname = $lastname;
        return $this;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email
     * @return CustomerRequest
     */
    public function setEmail(string $email): CustomerRequest
    {
        $this->email = $email;
        return $this;
    }

    /**
     * @return string
     */
    public function getEducation(): string
    {
        return $this->education;
    }

    /**
     * @param string $education
     * @return CustomerRequest
     */
    public function setEducation(string $education): CustomerRequest
    {
        $this->education = $education;
        return $this;
    }

    /**
     * @return bool
     */
    public function isAgreement(): bool
    {
        return $this->agreement;
    }

    /**
     * @param bool $agreement
     * @return CustomerRequest
     */
    public function setAgreement(bool $agreement): CustomerRequest
    {
        $this->agreement = $agreement;
        return $this;
    }



}