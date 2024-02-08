import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedDOBandUpdateColumnInUserEntity1707408907666 implements MigrationInterface {
    name = 'RemovedDOBandUpdateColumnInUserEntity1707408907666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`DOB\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updated_At\``);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`created_At\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`updated_At\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`updated_At\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`created_At\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updated_At\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`DOB\` varchar(255) NOT NULL`);
    }

}
