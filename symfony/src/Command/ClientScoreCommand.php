<?php

namespace App\Command;

use App\Services\Scoring\ScoringService;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ConfirmationQuestion;
use Symfony\Component\Console\Style\SymfonyStyle;

class ClientScoreCommand extends Command
{
    private const ARGUMENT_ALL = "all";

    protected static $defaultName = 'customer:refresh-score';

    private $scorignService;

    public function __construct(ScoringService $scorignService, ?string $name = null)
    {
        parent::__construct($name);
        $this->scorignService = $scorignService;
    }

    protected function configure()
    {
        $this
            ->setDescription('Updating customer score value')
            ->addArgument('clientId', InputArgument::REQUIRED, 'Customer ID or all')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $customerId = $input->getArgument('clientId');


        if ($customerId === self::ARGUMENT_ALL) {
            $io->warning("You trying to refresh all customers scores. For big dataset it can take a while. ");
            $result = $io->askQuestion(new ConfirmationQuestion("Are you sure to execute that?", false));
            if(!$result) {
                $io->success("Command aborted");
                return 0;
            }
            $this->scorignService->multiRefreshScore();
            $io->success("All customers scores are refreshed");

        } else {
            try {
                $client = $this->scorignService->singularRefreshScore($customerId);
                $io->success(sprintf('Client %s score is: %s', $client->getFullName(), $client->getScore()));
            } catch (\CustomerNotFoundException $e) {
                $io->error(sprintf('Customer with ID %s not found', $customerId));
            }

        }

        return 0;
    }
}
