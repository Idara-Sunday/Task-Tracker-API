import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrate1703432939908 implements MigrationInterface {
    name = 'NewMigrate1703432939908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`profile\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`DOB\` varchar(255) NOT NULL, \`userId\` int NULL, UNIQUE INDEX \`REL_a24972ebd73b106250713dcddd\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_At\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_At\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_posts\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`text\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_posts_comment_comments\` (\`userPostsId\` bigint NOT NULL, \`commentsId\` bigint NOT NULL, INDEX \`IDX_7455bea0204f823fee16f95ddd\` (\`userPostsId\`), INDEX \`IDX_9f7835f9d3ac424646a2e43fe9\` (\`commentsId\`), PRIMARY KEY (\`userPostsId\`, \`commentsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_a24972ebd73b106250713dcddd9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_posts\` ADD CONSTRAINT \`FK_9152833f45dc4ce32a5b0b016c2\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_posts_comment_comments\` ADD CONSTRAINT \`FK_7455bea0204f823fee16f95ddd0\` FOREIGN KEY (\`userPostsId\`) REFERENCES \`user_posts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_posts_comment_comments\` ADD CONSTRAINT \`FK_9f7835f9d3ac424646a2e43fe9b\` FOREIGN KEY (\`commentsId\`) REFERENCES \`comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_posts_comment_comments\` DROP FOREIGN KEY \`FK_9f7835f9d3ac424646a2e43fe9b\``);
        await queryRunner.query(`ALTER TABLE \`user_posts_comment_comments\` DROP FOREIGN KEY \`FK_7455bea0204f823fee16f95ddd0\``);
        await queryRunner.query(`ALTER TABLE \`user_posts\` DROP FOREIGN KEY \`FK_9152833f45dc4ce32a5b0b016c2\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_a24972ebd73b106250713dcddd9\``);
        await queryRunner.query(`DROP INDEX \`IDX_9f7835f9d3ac424646a2e43fe9\` ON \`user_posts_comment_comments\``);
        await queryRunner.query(`DROP INDEX \`IDX_7455bea0204f823fee16f95ddd\` ON \`user_posts_comment_comments\``);
        await queryRunner.query(`DROP TABLE \`user_posts_comment_comments\``);
        await queryRunner.query(`DROP TABLE \`comments\``);
        await queryRunner.query(`DROP TABLE \`user_posts\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_a24972ebd73b106250713dcddd\` ON \`profile\``);
        await queryRunner.query(`DROP TABLE \`profile\``);
    }

}
