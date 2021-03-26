<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210326064836 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE cart (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, delivery_date DATETIME DEFAULT NULL, status VARCHAR(50) DEFAULT NULL, INDEX IDX_BA388B7A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(120) DEFAULT NULL, user_categories LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE cron_job (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(191) NOT NULL, command VARCHAR(1024) NOT NULL, schedule VARCHAR(191) NOT NULL, description VARCHAR(191) NOT NULL, enabled TINYINT(1) NOT NULL, UNIQUE INDEX un_name (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE cron_report (id INT AUTO_INCREMENT NOT NULL, job_id INT DEFAULT NULL, run_at DATETIME NOT NULL, run_time DOUBLE PRECISION NOT NULL, exit_code INT NOT NULL, output LONGTEXT NOT NULL, INDEX IDX_B6C6A7F5BE04EA9 (job_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE item (id INT AUTO_INCREMENT NOT NULL, product_id INT DEFAULT NULL, cart_id INT DEFAULT NULL, supplier_id INT DEFAULT NULL, quantity DOUBLE PRECISION DEFAULT NULL, stock DOUBLE PRECISION DEFAULT NULL, INDEX IDX_1F1B251E4584665A (product_id), INDEX IDX_1F1B251E1AD5CDBF (cart_id), INDEX IDX_1F1B251E2ADD6D8C (supplier_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE meta (id INT AUTO_INCREMENT NOT NULL, address VARCHAR(255) DEFAULT NULL, address2 VARCHAR(255) DEFAULT NULL, zipcode VARCHAR(10) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, position LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', phone VARCHAR(15) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE picture (id INT AUTO_INCREMENT NOT NULL, file_path VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE product (id INT AUTO_INCREMENT NOT NULL, category_id INT DEFAULT NULL, picture_id INT DEFAULT NULL, unit_id INT DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, description LONGTEXT DEFAULT NULL, main_supplier_id INT DEFAULT NULL, is_internal TINYINT(1) DEFAULT NULL, code VARCHAR(20) DEFAULT NULL, user_categories LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', INDEX IDX_D34A04AD12469DE2 (category_id), UNIQUE INDEX UNIQ_D34A04ADEE45BDBF (picture_id), INDEX IDX_D34A04ADF8BD700D (unit_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE product_supplier (product_id INT NOT NULL, supplier_id INT NOT NULL, INDEX IDX_509A06E94584665A (product_id), INDEX IDX_509A06E92ADD6D8C (supplier_id), PRIMARY KEY(product_id, supplier_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE supplier (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) DEFAULT NULL, email VARCHAR(120) DEFAULT NULL, phone VARCHAR(20) DEFAULT NULL, is_internal TINYINT(1) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE unit (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) DEFAULT NULL, shorthand VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, metas_id INT DEFAULT NULL, email VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, code VARCHAR(50) DEFAULT NULL, name VARCHAR(120) DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), UNIQUE INDEX UNIQ_8D93D64923290B3B (metas_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE cart ADD CONSTRAINT FK_BA388B7A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE cron_report ADD CONSTRAINT FK_B6C6A7F5BE04EA9 FOREIGN KEY (job_id) REFERENCES cron_job (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE item ADD CONSTRAINT FK_1F1B251E4584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE item ADD CONSTRAINT FK_1F1B251E1AD5CDBF FOREIGN KEY (cart_id) REFERENCES cart (id)');
        $this->addSql('ALTER TABLE item ADD CONSTRAINT FK_1F1B251E2ADD6D8C FOREIGN KEY (supplier_id) REFERENCES supplier (id)');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD12469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04ADEE45BDBF FOREIGN KEY (picture_id) REFERENCES picture (id)');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04ADF8BD700D FOREIGN KEY (unit_id) REFERENCES unit (id)');
        $this->addSql('ALTER TABLE product_supplier ADD CONSTRAINT FK_509A06E94584665A FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE product_supplier ADD CONSTRAINT FK_509A06E92ADD6D8C FOREIGN KEY (supplier_id) REFERENCES supplier (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64923290B3B FOREIGN KEY (metas_id) REFERENCES meta (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE item DROP FOREIGN KEY FK_1F1B251E1AD5CDBF');
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04AD12469DE2');
        $this->addSql('ALTER TABLE cron_report DROP FOREIGN KEY FK_B6C6A7F5BE04EA9');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64923290B3B');
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04ADEE45BDBF');
        $this->addSql('ALTER TABLE item DROP FOREIGN KEY FK_1F1B251E4584665A');
        $this->addSql('ALTER TABLE product_supplier DROP FOREIGN KEY FK_509A06E94584665A');
        $this->addSql('ALTER TABLE item DROP FOREIGN KEY FK_1F1B251E2ADD6D8C');
        $this->addSql('ALTER TABLE product_supplier DROP FOREIGN KEY FK_509A06E92ADD6D8C');
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04ADF8BD700D');
        $this->addSql('ALTER TABLE cart DROP FOREIGN KEY FK_BA388B7A76ED395');
        $this->addSql('DROP TABLE cart');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE cron_job');
        $this->addSql('DROP TABLE cron_report');
        $this->addSql('DROP TABLE item');
        $this->addSql('DROP TABLE meta');
        $this->addSql('DROP TABLE picture');
        $this->addSql('DROP TABLE product');
        $this->addSql('DROP TABLE product_supplier');
        $this->addSql('DROP TABLE supplier');
        $this->addSql('DROP TABLE unit');
        $this->addSql('DROP TABLE user');
    }
}
