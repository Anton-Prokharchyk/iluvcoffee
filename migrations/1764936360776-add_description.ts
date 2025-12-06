import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDescription1764936360776 implements MigrationInterface {
  name = 'AddDescription1764936360776';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffees" ADD "description" character varying`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1c6c75e57fbf583e7d7adc42f0" ON "coffees" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0dc889faadd29649d279f27120" ON "coffees" ("name", "brand") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0dc889faadd29649d279f27120"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1c6c75e57fbf583e7d7adc42f0"`,
    );
    await queryRunner.query(`ALTER TABLE "coffees" DROP COLUMN "description"`);
  }
}
