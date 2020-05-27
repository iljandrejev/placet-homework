<?php


namespace App\Services\Scoring\Rules;


use App\Entity\Customer;

class EmailRule implements RuleInterface
{
    private const EMAIL_GMAIL = "@gmail.com";
    private const EMAIL_MAIL = "@mail.ru";
    private const EMAIL_YANDEX = "@yandex.ru";

    public function getScore(Customer $customer) : int
    {
        $email = $customer->getEmail();
        if(strpos($email, self::EMAIL_GMAIL) !== false) {
            return 10;
        } elseif (strpos($email, self::EMAIL_YANDEX)) {
            return 8;
        } elseif (strpos($email, self::EMAIL_MAIL)) {
            return 6;
        } else {
            return 3;
        }
    }
}