<?php


namespace App\Helpers;


use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Validator\ConstraintViolationListInterface;

class ValidationHelper
{

    public static function hasViolations(Request $request) : bool
    {
        /** @var ConstraintViolationListInterface $violationList */
        $violationList = $request->attributes->get('_violations');
        return $violationList->count() > 0;
    }

    public static function parseErrors(Request $request) : JsonResponse
    {
        $errors = [];

        if (!self::hasViolations($request)) {
            return new JsonResponse($errors);
        }
        /** @var ConstraintViolationListInterface $violationList */
        $violationList = $request->attributes->get('_violations');

        /** @var ConstraintViolation $violation */
        foreach ($violationList as $violation) {
            $errors[] = [
                'field' => $violation->getPropertyPath(),
                'message'=>   $violation->getMessage(),
            ];
        }

        return new JsonResponse([
            'result' => false,
            'error' => $errors
        ], 400);

    }
}