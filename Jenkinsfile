pipeline {
 agent any


// 
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
       

        // ⚡ MEJORA 4: Generar el reporte de commits para tu presentación
        sh '''
            export LANG=en_US.UTF-8
            export LANGUAGE=en_US.UTF-8
            export LC_ALL=en_US.UTF-8
            
            echo "==================================================" > commits_for_report.txt
            echo "  LOG DE COMMITS PARA EVALUACION - BUILD #${BUILD_NUMBER}" >> commits_for_report.txt
            echo "  Fecha de Generacion: $(date '+%Y-%m-%d %H:%M:%S')" >> commits_for_report.txt
            echo "==================================================" >> commits_for_report.txt
            echo "" >> commits_for_report.txt
            echo "📝 ULTIMOS 15 COMMITS EN EL REPOSITORIO:" >> commits_for_report.txt
            echo "--------------------------------------------------" >> commits_for_report.txt
            git log --oneline -15 --pretty=format:"%h | %an | %ar | %s" >> commits_for_report.txt
        '''


         archiveArtifacts artifacts: '*.zip, commits_for_report.txt', fingerprint: true
    }
    failure {
        echo 'ERROR: El pipeline ha fallado. Revisa los logs para más detalles.'
    }
}

}
