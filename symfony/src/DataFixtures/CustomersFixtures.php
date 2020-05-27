<?php

namespace App\DataFixtures;

use App\Entity\Customer;
use App\Factory\CustomerFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CustomersFixtures extends Fixture
{

    public function load(ObjectManager $manager)
    {
        foreach (self::NAMES as $name){
            $fullName = explode(" ", $name);
            $email = $this->createEmail($fullName[0], $fullName[1]);
            $agreement = boolval(rand(0,1));
            $manager->persist(
                CustomerFactory::createCustomer(
                    $fullName[0],
                    $fullName[1],
                    $email,
                    $this->getEducation(),
                    $agreement
                )
            );
        }

        $manager->flush();
    }

    const NAMES = [
        "Errol Sandavol",
        "Lorrine Roux",
        "Latosha Boomer",
        "Timika Inoue",
        "Arlena Pellot",
        "Russ Gerena",
        "Magdalena Balfour",
        "Tomi Custer",
        "Tenisha Hazelton",
        "Ilana Holdaway",
        "Lillian Orwig",
        "Kimberli Mazur",
        "Corinne Zink",
        "Jamison Harig",
        "Johnette Edelen",
        "Tanya Barfoot",
        "Normand Hackbarth",
        "Kati Pickel",
        "Garnett Kimler",
        "Fausto Egger",
        "Spencer Hoskins",
        "Omega Pyles",
        "Shanda Quach",
        "Julissa Wilmore",
        "Hyun Devereux",
        "Roderick Taniguchi",
        "Paz Buzard",
        "Lilly Wilkes",
        "Amina Postma",
        "Lea Riggle",
    ];


    const EDUCATIONS = [
        Customer::EDUCATION_HIGH,
        Customer::EDUCATION_PROF,
        Customer::EDUCATION_MIDDLE
    ];

    const DOMAINS = [
      "@gmail.com",
      "@mail.ru",
      "@yandex.ru",
      "@neti.ee",
      "@outlook.com",
      "@other.com"
    ];

    private function createEmail($firstname, $lastname){
        $domain = self::DOMAINS[rand(0, count(self::DOMAINS) -1)];
        return sprintf("%s.%s%s",strtolower($firstname), strtolower($lastname), $domain );
    }

    private function getEducation() {
        return self::EDUCATIONS[rand(0, count(self::EDUCATIONS) -1)];
    }
}
