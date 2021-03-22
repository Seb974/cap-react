<?php

namespace App\Command;

use App\Service\Serializer\CsvService;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class GetVifDatasCommand extends Command
{
    protected $csvService;
    protected static $defaultName = 'app:get-vif-datas';
    protected static $defaultDescription = 'get refreshed users and products from VIF';

    public function __construct(CsvService $csvService)
    {
        parent::__construct();
        $this->csvService = $csvService;
    }

    protected function configure()
    {
        $this
            ->setName(self::$defaultName)
            ->setDescription(self::$defaultDescription)
            ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $arg1 = $input->getArgument('arg1');

        // if ($arg1) {
        //     $io->note(sprintf('You passed an argument: %s', $arg1));
        // }

        // if ($input->getOption('option1')) {
        //     // ...
        // }
        $newline = $this->csvService->getUsersFromCsv();

        // $io->success('The first void line in your file is the number ' . $newline);

        // return Command::SUCCESS;
        return $newline;
    }
}
