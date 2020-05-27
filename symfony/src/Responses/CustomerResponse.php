<?php

namespace App\Responses;

class CustomerResponse
{
    public $id;

    public $firstname;

    public $lastname;

    public $education;

    public $email;

    public $agreement;

    public $score;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     * @return CustomerResponse
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * @param mixed $firstname
     * @return CustomerResponse
     */
    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * @param mixed $lastname
     * @return CustomerResponse
     */
    public function setLastname($lastname)
    {
        $this->lastname = $lastname;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getEducation()
    {
        return $this->education;
    }

    /**
     * @param mixed $education
     * @return CustomerResponse
     */
    public function setEducation($education)
    {
        $this->education = $education;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param mixed $email
     * @return CustomerResponse
     */
    public function setEmail($email)
    {
        $this->email = $email;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getAgreement()
    {
        return $this->agreement;
    }

    /**
     * @param mixed $agreement
     * @return CustomerResponse
     */
    public function setAgreement($agreement)
    {
        $this->agreement = $agreement;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getScore()
    {
        return $this->score;
    }

    /**
     * @param mixed $score
     * @return CustomerResponse
     */
    public function setScore($score)
    {
        $this->score = $score;
        return $this;
    }




}