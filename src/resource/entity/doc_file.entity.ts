import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Doc } from "./doc.entity";
import { File } from "./file.entity";

@Entity("document_file")
export class DocFile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Doc, doc => doc.id, { onDelete: 'CASCADE' })
    doc: Doc;
    @ManyToOne(() => File, file => file.id, { onDelete: 'CASCADE' })
    file: File;
}