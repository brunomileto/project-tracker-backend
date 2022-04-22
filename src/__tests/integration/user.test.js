const sha1 = require('sha1');
const { uuid } = require('uuidv4');
const {v4} = require('uuid')
const { User } = require('../../models/user.models.js');
const {db} = require('../../databases/firebase/firebase.firestore.database.js');
const {users} = require('../../databases/firebase/collections.firebase/collections.firebase.js');
const request = require ('supertest');
const app = require('../../app.js');


describe('User Collection', () => {
  it('should add a new user into firebase database', async () => {
    const user = await new User(
      v4(), 
      "Bruno Mileto", 
      "brunomill@gmail.com", 
      hashedPassword, 
      new Date(2021, 12, 1), 
      new Date(2021,12,22)
    );
    const userTestCollection = db.collection(users.test);
    const hashedPassword = sha1("1234");
    const userDoc = userTestCollection.doc(user.email);
    const {id, name, email, password, dateCreated, dateUpdated} = users.prop;
    await userDoc.set({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      dateCreated: user.dateCreated,
      dateUpdated: user.dateUpdated
    })

    const userTest = db.collection(users.test).where('email', '==', user.email);
    
    const userTestDoc = await userTest.get();
/*     const cityRef = db.collection('cities').doc('SF');
    const doc = await cityRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
 */
    expect(userTestDoc.empty).toBe(false);
    // ESPERO que soma SEJA 6
  });
});