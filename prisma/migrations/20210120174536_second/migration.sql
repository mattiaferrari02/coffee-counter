-- DropForeignKey
ALTER TABLE `coffee` DROP FOREIGN KEY `coffee_ibfk_1`;

-- AlterTable
ALTER TABLE `coffee` MODIFY `time` DATETIME(3);

-- AddForeignKey
ALTER TABLE `Coffee` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
