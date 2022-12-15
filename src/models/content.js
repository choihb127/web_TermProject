"use strict";

const Sequelize = require('sequelize');

module.exports = class Content extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            { //테이블  필드 설정
                id: {
                    type: Sequelize.INTEGER, //int형
                    autoIncrement: true, //자동증가
                    allowNull: false, //NOT NULL
                    unique: true, //UNIQUE
                    primaryKey: true
                },
                title: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                file_name: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                file_path: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                content: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                },
                creator: {
                    type: Sequelize.STRING(25),
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING(25),
                    allowNull: false,
                },
            },
            { //테이블 자체 설정
                sequelize, /* static init 메서드의 매개변수와 연결되는 옵션으로, db.sequelize 객체를 넣어야 한다. */
                timestamps: true, /* true : 각각 레코드가 생성, 수정될 때의 시간이 자동으로 입력된다. */
                modelName: 'Content', /* 모델 이름을 설정. 노드에서 사용함 */
                tableName: 'content', /* 데이터베이스의 테이블 이름. */
                charset: 'utf8', /* 인코딩 */
                collate: 'utf8_general_ci'
            }
        );
    }

    //다른 모델과 관계
    static associate(db) {
        db.Content.belongsToMany(db.Tag, { through: 'contentTag' });
        db.Content.hasMany(db.Comment, { foreignKey: 'contentid', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' })
    }
};