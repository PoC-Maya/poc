// app/dev/action-tester/page.jsx
'use client'

import { useState, useEffect } from 'react'
import * as allActions from '@/app/actions'

export default function ActionTester() {
  const [selectedAction, setSelectedAction] = useState('')
  const [inputJson, setInputJson] = useState('{}')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [savedTests, setSavedTests] = useState([])
  const [testName, setTestName] = useState('')
  const [actionMetadata, setActionMetadata] = useState(null)
  
  // Lista de todas as actions disponíveis com metadados
  const availableActions = Object.keys(allActions)
    .filter(key => typeof allActions[key] === 'function')
    .map(key => ({
      name: key,
      metadata: allActions[key].metadata || {
        description: 'Sem descrição',
        category: 'Sem categoria',
        inputModel: '{}'
      }
    }))
    .sort((a, b) => {
      // Ordenar primeiro por categoria, depois por nome
      if (a.metadata.category !== b.metadata.category) {
        return a.metadata.category.localeCompare(b.metadata.category)
      }
      return a.name.localeCompare(b.name)
    })
  
  // Agrupar actions por categoria
  const actionsByCategory = availableActions.reduce((acc, action) => {
    const category = action.metadata.category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(action)
    return acc
  }, {})
  
  // Carregar testes salvos do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('actionTests')
    if (saved) {
      try {
        setSavedTests(JSON.parse(saved))
      } catch (e) {
        console.error('Erro ao carregar testes salvos:', e)
      }
    }
  }, [])
  
  // Atualizar metadados quando a action selecionada mudar
  useEffect(() => {
    if (selectedAction) {
      const action = availableActions.find(a => a.name === selectedAction)
      if (action) {
        setActionMetadata(action.metadata)
        // Preencher o JSON de entrada com o modelo
        if (action.metadata.inputModel) {
          try {
            const formattedJson = JSON.stringify(
              typeof action.metadata.inputModel === 'string' 
                ? JSON.parse(action.metadata.inputModel)
                : action.metadata.inputModel,
              null, 2
            )
            setInputJson(formattedJson)
          } catch (e) {
            console.error('Erro ao formatar modelo de entrada:', e)
            setInputJson(action.metadata.inputModel)
          }
        }
      }
    }
  }, [selectedAction])
  
  // Função para executar a action selecionada
  const runAction = async () => {
    if (!selectedAction) {
      setError('Selecione uma action para testar')
      return
    }
    
    try {
      setLoading(true)
      setError('')
      
      let formData = new FormData()
      
      // Preparar os dados de entrada
      try {
        const jsonData = JSON.parse(inputJson)
        Object.entries(jsonData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            // Para arrays, adicione cada item separadamente
            value.forEach(item => {
              formData.append(key, typeof item === 'object' ? JSON.stringify(item) : String(item))
            })
          } else if (value !== null && typeof value === 'object') {
            // Para objetos, converta para string JSON
            formData.append(key, JSON.stringify(value))
          } else if (value !== undefined) {
            // Para valores primitivos
            formData.append(key, String(value))
          }
        })
      } catch (e) {
        setError(`Erro ao processar JSON: ${e.message}`)
        setLoading(false)
        return
      }
      
      // Executar a action
      const actionFn = allActions[selectedAction]
      console.log(`Executando action: ${selectedAction}`)
      
      const startTime = performance.now()
      const actionResult = await actionFn({}, formData) // Passando prevState vazio
      const endTime = performance.now()
      
      setResult({
        data: actionResult,
        executionTime: `${(endTime - startTime).toFixed(2)}ms`
      })
    } catch (error) {
      console.error('Erro ao executar action:', error)
      setError(`Erro ao executar action: ${error.message}`)
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }
  
  // Salvar o teste atual
  const saveTest = () => {
    if (!testName || !selectedAction) return
    
    const newTest = {
      id: Date.now().toString(),
      name: testName,
      action: selectedAction,
      inputJson,
      metadata: actionMetadata
    }
    
    const updatedTests = [...savedTests, newTest]
    setSavedTests(updatedTests)
    localStorage.setItem('actionTests', JSON.stringify(updatedTests))
    setTestName('')
  }
  
  // Carregar um teste salvo
  const loadTest = (test) => {
    setSelectedAction(test.action)
    setInputJson(test.inputJson)
  }
  
  // Excluir um teste salvo
  const deleteTest = (id) => {
    const updatedTests = savedTests.filter(test => test.id !== id)
    setSavedTests(updatedTests)
    localStorage.setItem('actionTests', JSON.stringify(updatedTests))
  }
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Server Action Tester</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Painel de configuração */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="mb-6">
              <label htmlFor="action-select" className="block text-lg font-medium mb-2">
                Selecione a Action
              </label>
              <select 
                id="action-select"
                value={selectedAction} 
                onChange={(e) => setSelectedAction(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">-- Selecione uma action --</option>
                {Object.entries(actionsByCategory).map(([category, actions]) => (
                  <optgroup key={category} label={category}>
                    {actions.map(action => (
                      <option key={action.name} value={action.name}>
                        {action.name} || {action.metadata.description}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            
            {actionMetadata && (
              <div className="mb-6 p-4 bg-gray-50 rounded-md">
                <h2 className="text-lg font-semibold mb-2">{actionMetadata.description}</h2>
                <p className="text-sm text-gray-600 mb-2">Categoria: {actionMetadata.category}</p>
              </div>
            )}
            
            <div className="mb-6">
              <label htmlFor="json-input" className="block text-lg font-medium mb-2">
                Dados de Entrada (JSON)
              </label>
              <textarea
                id="json-input"
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                className="w-full h-64 p-2 font-mono text-sm border rounded"
              />
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={runAction} 
                disabled={loading || !selectedAction}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
              >
                {loading ? 'Executando...' : 'Executar Action'}
              </button>
              
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  placeholder="Nome do teste"
                  className="flex-1 p-2 border rounded"
                />
                <button 
                  onClick={saveTest} 
                  disabled={!testName || !selectedAction}
                  className="px-4 py-2 bg-gray-200 rounded disabled:bg-gray-100"
                >
                  Salvar Teste
                </button>
              </div>
            </div>
            
            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}
          </div>
          
          {/* Resultado */}
          {result && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Resultado</h2>
                {result.executionTime && (
                  <span className="text-sm text-gray-500">
                    Tempo de execução: {result.executionTime}
                  </span>
                )}
              </div>
              <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
                {JSON.stringify(result.data || result, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        {/* Testes salvos */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Testes Salvos</h2>
            
            {savedTests.length === 0 ? (
              <p className="text-gray-500">Nenhum teste salvo ainda.</p>
            ) : (
              <div className="space-y-3">
                {savedTests.map(test => (
                  <div 
                    key={test.id} 
                    className="border rounded p-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{test.name}</p>
                      <p className="text-sm text-gray-500">{test.action}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => loadTest(test)} 
                        className="px-2 py-1 bg-gray-200 rounded text-sm"
                      >
                        Carregar
                      </button>
                      <button 
                        onClick={() => deleteTest(test.id)} 
                        className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}