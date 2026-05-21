import os
import streamlit as st
from dotenv import load_dotenv
from groq import Groq

# =========================
# Page Config
# =========================
st.set_page_config(
    page_title="SAS AI Agent Enterprise Plataform",
    page_icon="🧠",
    layout="wide"
)

# =========================
# CSS
# =========================
st.markdown("""
<style>
.main {
    background-color: #F7F8FA;
}

.block-container {
    padding-top: 2rem;
}

.hero {
    background: linear-gradient(135deg, #111827 0%, #1F2937 100%);
    padding: 28px;
    border-radius: 18px;
    color: white;
    margin-bottom: 24px;
}

.hero h1 {
    margin-bottom: 8px;
}

.hero p {
    font-size: 18px;
    color: #D1D5DB;
}

.stTextArea textarea {
    background-color: #111827;
    color: white;
    border-radius: 12px;
    font-family: Consolas, monospace;
}

.stButton button {
    background-color: #2563EB;
    color: white;
    border-radius: 10px;
    height: 48px;
    width: 220px;
    font-size: 16px;
    font-weight: bold;
    border: none;
}

.stButton button:hover {
    background-color: #1D4ED8;
    color: white;
}

.metric-card {
    background-color: #FFFFFF;
    padding: 22px;
    border-radius: 16px;
    margin-bottom: 18px;
    border: 1px solid #E5E7EB;
    box-shadow: 0px 4px 14px rgba(0,0,0,0.06);
    min-height: 150px;
}

.metric-card h3 {
    margin-top: 0;
    color: #111827;
}

.metric-card p {
    font-size: 16px;
    line-height: 1.6;
    color: #374151;
}

.small-card {
    background-color: #FFFFFF;
    padding: 16px;
    border-radius: 14px;
    border: 1px solid #E5E7EB;
    box-shadow: 0px 2px 8px rgba(0,0,0,0.04);
}

.footer-note {
    color: #6B7280;
    font-size: 14px;
}
</style>
""", unsafe_allow_html=True)

# =========================
# Environment / Groq Client
# =========================
load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# =========================
# Sidebar
# =========================
with st.sidebar:
    st.title("⚙️ SAS AI Ops")
    st.markdown("---")

    st.markdown("""
### Módulos SAS

- SAS Log Analyzer
- PROC SQL Debugging
- CAS / Viya Troubleshooting
- Memory & Performance
- Encoding Issues
- Oracle Integration
- ETL Job Failures
""")

    st.markdown("---")

    st.info("Especialista IA focado em ambientes SAS Enterprise")

    st.success("Sistema Operacional")

# =========================
# Header
# =========================
st.markdown("""
<div class="hero">
    <h1>SAS AI Agent Enterprise Plataform</h1>
    <p>Agente de IA especializado em análise de logs SAS, troubleshooting ETL, SAS Viya, CAS e integrações enterprise.</p>
</div>
""", unsafe_allow_html=True)

# =========================
# Top Cards
# =========================
col_a, col_b, col_c = st.columns(3)

with col_a:
    st.markdown("""
    <div class="small-card">
        <h4>Foco</h4>
        <p>Logs SAS, ETL, PROC SQL, CAS, Viya e integrações Oracle.</p>
    </div>
    """, unsafe_allow_html=True)

with col_b:
    st.markdown("""
    <div class="small-card">
        <h4>Objetivo</h4>
        <p>Reduzir tempo de troubleshooting em ambientes SAS enterprise.</p>
    </div>
    """, unsafe_allow_html=True)

with col_c:
    st.markdown("""
    <div class="small-card">
        <h4>Visão</h4>
        <p>AI-native operational intelligence para sistemas SAS legacy e modernos.</p>
    </div>
    """, unsafe_allow_html=True)

st.markdown("")

# =========================
# Input
# =========================
st.markdown("## 📄 Análise de Log SAS")

uploaded_file = st.file_uploader(
    "Carregue um log SAS (.log ou .txt)",
    type=["txt", "log"]
)

if uploaded_file is not None:
    log_input = uploaded_file.read().decode("utf-8", errors="ignore")

    st.text_area(
        "Conteúdo do log carregado:",
        value=log_input[-8000:],
        height=280,
        key="uploaded_log_area"
    )

else:
    log_input = st.text_area(
        "Cole aqui o log SAS:",
        height=280,
        key="manual_log_area",
        placeholder="""
Exemplo:
ERROR: Insufficient memory to execute DATA step program.
ERROR: ORACLE execute error: ORA-00942 table or view does not exist.
WARNING: Apparent symbolic reference not resolved.
ERROR: Some character data was lost during transcoding.
"""
    )

# =========================
# LLM Function
# =========================
def analyze_sas_log(log_text):

    # Limita o log para evitar excesso de tokens.
    # Em logs SAS, o erro mais relevante normalmente aparece no final.
    log_text = log_text[-8000:]

    prompt = f"""
Você é um agente especialista em SAS Enterprise Operations.

Você possui experiência em:
- SAS 9.4
- SAS Viya
- SAS Studio
- SAS Data Integration Studio
- SAS Visual Analytics
- SAS Visual Investigator
- CAS
- PROC SQL
- DATA Step
- Macro Language
- LIBNAME
- Oracle integration
- encoding/transcoding
- memory errors
- performance tuning
- ETL troubleshooting
- jobs em produção
- ambientes Linux

Analise o log SAS abaixo como um especialista enterprise.

Retorne APENAS neste formato exato:

ROOT_CAUSE:
...

SAS_COMPONENT:
...

BUSINESS_IMPACT:
...

SUGGESTED_SOLUTION:
...

SEVERITY:
...

TECHNICAL_EXPLANATION:
...

NEXT_ACTIONS:
...

Regras:
- A resposta deve estar em português.
- Seja técnico, objetivo e profissional.
- Não invente informações que não estejam suportadas pelo log.
- Se não houver informação suficiente, diga claramente.
- Priorize causa raiz, impacto operacional e ação prática.
- Se for erro SAS comum, explique o padrão.
- Se envolver Oracle, CAS, macro, encoding ou memória, destaque isso.
- Foque em ambientes SAS enterprise e pipelines críticos.

Log SAS:
{log_text}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "Você é um especialista sênior em SAS Enterprise, SAS Viya, ETL, PROC SQL, CAS, Oracle integration e troubleshooting de logs SAS."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )

    return response.choices[0].message.content

# =========================
# Parser
# =========================
def parse_response(text):

    sections = {}
    current_section = None

    valid_sections = [
        "ROOT_CAUSE",
        "SAS_COMPONENT",
        "BUSINESS_IMPACT",
        "SUGGESTED_SOLUTION",
        "SEVERITY",
        "TECHNICAL_EXPLANATION",
        "NEXT_ACTIONS"
    ]

    for line in text.splitlines():
        line = line.strip()

        if line.replace(":", "") in valid_sections:
            current_section = line.replace(":", "")
            sections[current_section] = ""

        elif current_section:
            sections[current_section] += line + " "

    return sections

# =========================
# Run Analysis
# =========================
if st.button("Analisar Log SAS"):

    if not log_input.strip():
        st.warning("Por favor, cole ou carregue um log SAS primeiro.")

    else:
        with st.spinner("Analisando log SAS com agente especialista..."):
            result = analyze_sas_log(log_input)

        sections = parse_response(result)

        st.success("Análise concluída")

        st.markdown("## 🧩 Resultado da Análise SAS")

        col1, col2 = st.columns(2)

        with col1:
            st.markdown(f"""
            <div class="metric-card">
                <h3>🚨 Causa Raiz</h3>
                <p>{sections.get("ROOT_CAUSE", "Não identificado.")}</p>
            </div>
            """, unsafe_allow_html=True)

            st.markdown(f"""
            <div class="metric-card">
                <h3>🧱 Componente SAS</h3>
                <p>{sections.get("SAS_COMPONENT", "Não identificado.")}</p>
            </div>
            """, unsafe_allow_html=True)

            st.markdown(f"""
            <div class="metric-card">
                <h3>📉 Impacto Operacional</h3>
                <p>{sections.get("BUSINESS_IMPACT", "Não identificado.")}</p>
            </div>
            """, unsafe_allow_html=True)

        with col2:
            st.markdown(f"""
            <div class="metric-card">
                <h3>🛠 Solução Sugerida</h3>
                <p>{sections.get("SUGGESTED_SOLUTION", "Não identificado.")}</p>
            </div>
            """, unsafe_allow_html=True)

            st.markdown(f"""
            <div class="metric-card">
                <h3>⚠️ Severidade</h3>
                <p>{sections.get("SEVERITY", "Não identificado.")}</p>
            </div>
            """, unsafe_allow_html=True)

            st.markdown(f"""
            <div class="metric-card">
                <h3>✅ Próximas Ações</h3>
                <p>{sections.get("NEXT_ACTIONS", "Não identificado.")}</p>
            </div>
            """, unsafe_allow_html=True)

        st.markdown(f"""
        <div class="metric-card">
            <h3>📘 Explicação Técnica</h3>
            <p>{sections.get("TECHNICAL_EXPLANATION", "Não identificado.")}</p>
        </div>
        """, unsafe_allow_html=True)

        with st.expander("Ver resposta bruta da IA"):
            st.text(result)

st.markdown("""
<p class="footer-note">
MVP experimental focado em SAS AI Ops. Próximas versões podem incluir monitorização automática de diretórios, dashboard de erros recorrentes, memória operacional e agentes especializados por componente SAS.
</p>
""", unsafe_allow_html=True)