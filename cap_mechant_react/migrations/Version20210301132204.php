<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210301132204 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user ADD metas_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64923290B3B FOREIGN KEY (metas_id) REFERENCES meta (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D64923290B3B ON user (metas_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64923290B3B');
        $this->addSql('DROP INDEX UNIQ_8D93D64923290B3B ON user');
        $this->addSql('ALTER TABLE user DROP metas_id');
    }
}
