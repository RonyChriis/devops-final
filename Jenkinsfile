pipeline {
 agent any

```
// ⚡ MEJORA 1: Activación automática cada 5 minutos
triggers {
    githubPush()
}

// ⚡ MEJORA 2: Variables para mayor claridad
environment {
    APP_NAME = 'devops-final'
    BUILD_VERSION = "v${BUILD_NUMBER}"
}

stages {
    stage('📥 Checkout') {
        steps {
            echo 'Obteniendo el código fuente desde GitHub...'
        }
    }
    stage('🏗️ Build') {
        steps {
            echo 'Build: La aplicación es estática, no se requiere compilación.'
        }
    }
    stage('🧪 Test') {
        steps {
            echo 'Test: Ejecutando pruebas (simulado).'
        }
    }
    stage('📦 Package Release') {
        steps {
            echo 'Package: Creando el artefacto del proyecto...'
            // ✅ MEJORA CLAVE: Solo empaqueta el contenido de la carpeta 'src'
            // Usar './src/*' asegura que los archivos estén en la raíz del .zip, no dentro de una carpeta 'src'.
            sh "zip -r ${APP_NAME}-${BUILD_VERSION}.zip ./src/*"
        }
    }
}
post {
    success {
        echo '¡Pipeline ejecutado con éxito!'

        // ⚡ MEJORA 3: Archivar el ZIP y el reporte de commits
        archiveArtifacts artifacts: '*.zip, commits_for_report.txt', fingerprint: true

        // ⚡ MEJORA 4: Generar el reporte de commits para tu presentación
        sh '''
            echo "==========================================" > commits_for_report.txt
            echo "    LOG DE COMMITS PARA EVALUACIÓN     " >> commits_for_report.txt
            echo "==========================================" >> commits_for_report.txt
            echo "" >> commits_for_report.txt
            echo "Últimos 10 commits en el repositorio:" >> commits_for_report.txt
            git log --oneline -10 --pretty=format:"%h | %an | %ar | %s" >> commits_for_report.txt
        '''
    }
    failure {
        echo 'ERROR: El pipeline ha fallado. Revisa los logs para más detalles.'
    }
}
```

}