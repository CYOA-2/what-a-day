const pool = require('../utils/pool.js');

module.exports = class Prompt {
    id;
    story;
    promptA;
    promptB;
    aId;
    bId;

    constructor(row) {
        this.id = row.id;
        this.story = row.story;
        this.promptA = row.prompt_a;
        this.promptB = row.prompt_b;
        this.aId = row.a_id;
        this.bId = row.b_id;
    }

    static async getById(id) {
        const { rows } = await pool.query(`
            SELECT * FROM prompts WHERE id=$1
            `, [id]);
        if(!rows[0]) { return null; }
        return new Prompt(rows[0]);
    } 

};