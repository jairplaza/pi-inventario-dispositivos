import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1791374286890 implements MigrationInterface {
    name = 'InitialSchema1791374286890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dispositivos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(100) NOT NULL, "tipo" character varying(50) NOT NULL, "serial" character varying(100) NOT NULL, "disponible" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoria_id" uuid, CONSTRAINT "UQ_88accb0fe77d9c4aa3a6c368486" UNIQUE ("nombre"), CONSTRAINT "UQ_a3b5c682ffb3d7975724ff78e30" UNIQUE ("serial"), CONSTRAINT "PK_e9595bb1be0bf2b2e376b904434" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categorias" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying NOT NULL, "descripcion" character varying, CONSTRAINT "UQ_ccdf6cd1a34ea90a7233325063d" UNIQUE ("nombre"), CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dispositivos" ADD CONSTRAINT "FK_87508042a4be8ac311d1f4b2434" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dispositivos" DROP CONSTRAINT "FK_87508042a4be8ac311d1f4b2434"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
        await queryRunner.query(`DROP TABLE "dispositivos"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
