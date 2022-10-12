import {pool} from '../db.js'

export const homeUsers = (req, res) => res.send('HOME')

export const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query('select * from users')
    res.send(result)
  } catch (error) {
    return res.status(500).send('Algo fue mal')
  }
}

export const getUser = async (req, res) => {
  const {id} = req.params
  try {
    const [result] = await pool.query('select * from users where id = (?)', [id])
    result <= 0 ? res.status(404).json({'message': 'User not found'}) : res.send(result[0])
  } catch (error) {
    return res.status(500).send('Algo fue mal')
  }
}

export const createUsers = async (req, res) => {
  const {names, ages} = req.body
  try {
    const [rows] = await pool.query('insert into users (names, ages) values (?, ?)', [names, ages])
    res.send({
      id: rows.insertId,
      names,
      ages
    })
  } catch (error) {
    return res.status(500).send('Algo fue mal')
  }
}

export const updateUsers = async (req, res) => {
  const {id} = req.params
  const {names, ages} = req.body
  try {
    const [result] = await pool.query('update users SET names = ifnull(?, names), ages = ifnull(?, ages) WHERE id = ?;', [names, ages, id])
    const [rows] = await pool.query('select * from users where id = ?',[id])
    result.affectedRows <= 0 ? res.status(404).json({'message': 'User not found to be updated'}) : res.json(rows[0])
  } catch (error) {
    return res.status(500).send('Algo fue mal')
  }
}

export const deleteUsers = async (req, res) => {
  const {id} = req.params
  try {
    const [result] = await pool.query('delete from users where id = (?)', [id])
    result.affectedRows <= 0 ? res.status(404).json({'message': 'User not found to be deleted'}) : res.json({'message': 'User eliminated succesfully'})  
  } catch (error) {
    return res.status(500).send('Algo fue mal')
  }
}