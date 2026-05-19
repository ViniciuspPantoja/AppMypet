import { auth, db } from './firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth'
import { testRouter } from 'expo-router/testing-library';

async function runFirebaseTest() {
  console.log('🔍 Iniciando testes do Firebase...\n')

  try {
    // 🔐 Teste Auth
    const email = `test_${Date.now()}@test.com`
    const password = '123456'

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    const uid = userCredential.user.uid
    console.log('✅ Auth OK | UID:', uid)

    // 📦 Teste Firestore
    const userRef = doc(db, 'users', uid)
    await setDoc(userRef, {
      name: 'Teste Firebase',
      email,
      role: 'user',
    })

    console.log('✅ Firestore WRITE OK')

    const snapshot = await getDoc(userRef)

    if (snapshot.exists()) {
      console.log('✅ Firestore READ OK:', snapshot.data())
    } else {
      throw new Error('Documento não encontrado')
    }

    // 🧹 Cleanup
    await deleteUser(userCredential.user)
    console.log('🧹 Usuário de teste removido')

    console.log('\n🎉 Todos os testes passaram com sucesso!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Teste falhou:', error)
    process.exit(1)
  }
}

runFirebaseTest()

