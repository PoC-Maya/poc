#!/bin/bash

# Diretório base para as actions
BASE_DIR="./app/actions"
INDEX_FILE="$BASE_DIR/index.js"

# Criar cabeçalho do arquivo
cat > "$INDEX_FILE" << EOF
/**
 * Arquivo de exportação de todas as Server Actions
 * Gerado automaticamente
 */

EOF

# Primeiro, adicionar todas as importações
find "$BASE_DIR" -type f -name "*.js" ! -name "index.js" | sort | while read -r file; do
    rel_path=${file#"$BASE_DIR/"}
    action_name=$(basename "$file" .js)
    import_path="./${rel_path}"
    
    echo "import { $action_name as _$action_name } from '$import_path';" >> "$INDEX_FILE"
done

echo "" >> "$INDEX_FILE"
echo "// Adicionar metadados e re-exportar" >> "$INDEX_FILE"
echo "" >> "$INDEX_FILE"

# Depois, adicionar metadados e re-exportar
find "$BASE_DIR" -type f -name "*.js" ! -name "index.js" | sort | while read -r file; do
    action_name=$(basename "$file" .js)
    
    # Extrair descrição e categoria
    description=$(grep -m 1 "@description" "$file" | sed 's/.*@description\s*//')
    category=$(grep -m 1 "@category" "$file" | sed 's/.*@category\s*//')
    
    # Extrair modelo de entrada
    input_model=$(awk '/\@inputModel/{flag=1; next} /\*\//{if (flag) exit} flag' "$file" | sed 's/^ \* //')
    
    # Verificar se o modelo de entrada está vazio
    if [ -z "$input_model" ]; then
        input_model="{}"
    else
        # Garantir que o modelo de entrada esteja entre chaves
        if [[ ! "$input_model" =~ ^\{ ]]; then
            input_model="{ $input_model }"
        fi
    fi
    
    # Adicionar metadados
    cat >> "$INDEX_FILE" << EOF
_$action_name.metadata = {
  description: '$description',
  category: '$category',
  inputModel: $input_model
};

export const $action_name = _$action_name;

EOF
done

echo "Arquivo index.js gerado com sucesso em $INDEX_FILE"