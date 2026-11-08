// Research narrative and prospective agenda derived from the user's adjustment brief.
// Empirical paper summaries and publication dates are separately verified.
(() => {
const bi=(zh,en)=>({zh,en});
window.PORTFOLIO={
 about:[
 bi('目前就读于华东师范大学 · 上海智能教育研究院，为智能教育博士研究生，师从黄昌勤教授。学习经历涵盖计算机科学、教育技术学与智能教育。主要从事生成式 AI 教育应用、智能体支持学习、个性化学习、问题式学习与学习者建模研究，已发表多篇高水平学术论文。','I am a Ph.D. student in Intelligent Education at the Shanghai Institute of AI for Education, East China Normal University, supervised by Prof. Changqin Huang. My academic background spans computer science, educational technology, and intelligent education. My research focuses on generative AI in education, agent-supported learning, personalized learning, problem-based learning, and learner modeling. I have published several papers in leading academic venues.'),
 bi('欢迎关注我的研究工作。如果您对相关研究方向感兴趣，期待与您交流，并探索进一步合作的可能。','Thank you for your interest in my research. If our research interests overlap, I look forward to hearing from you and exploring opportunities to collaborate.')],
 agenda:bi('从学习需求出发设计 AI 支持机制，再通过教学实验与过程数据检验其作用：把系统设计、学习机制与实证证据连接起来。','Starting from learners’ needs, I connect the design of AI support mechanisms with classroom studies and process data to examine how and under what conditions they support learning.'),
 directions:[
 {title:bi('生成式 AI 与认知发展','Generative AI for Learning'),question:bi('AI 支持如何促进思考，而不只是加快答案生成？','How can AI support thinking beyond producing answers?'),body:bi('以认知学徒制、问题式学习和 AI 反馈为切入点，研究支持机制与元认知、高阶思维及学习表现之间的关系。','I investigate cognitive apprenticeship, problem-based learning, and AI feedback to understand the relationship between support mechanisms, metacognition, higher-order thinking, and learning performance.'),papers:[1,3,8,9]},
 {title:bi('智能体支持学习','Agent-Supported Learning'),question:bi('智能体的角色分工与协作方式如何改变学习活动？','How do agent roles and collaboration shape learning activities?'),body:bi('从单智能体到多智能体，考察活动设计、动机支持与学习互动。相关基金项目进一步涉及认知异常归因与适性引导。','I examine activity design, motivational support, and learning interaction across single- and multi-agent environments. Related project work also addresses cognitive anomaly attribution and adaptive guidance.'),papers:[4,6]},
 {title:bi('个性化学习支持','Personalized Learning Support'),question:bi('怎样让问题、阅读支架与反馈回应不同学习者的需求？','How can questions, reading scaffolds, and feedback respond to different learners?'),body:bi('将个性化问题生成、两层问题式学习与 GenAI 反馈联系起来，关注学习者对支持的使用方式及学习结果。','I connect personalized question generation, two-tier problem-based learning, and GenAI feedback, focusing on how learners use support and the resulting learning outcomes.'),papers:[5,3,8]},
 {title:bi('学习分析与认知情感建模','Learning Analytics & Cognitive–Affective Modeling'),question:bi('如何从行为和多模态数据中理解学习过程与状态？','How can behavior and multimodal data help us understand learning processes and states?'),body:bi('研究基础包括多模态情感分析及其不确定性建模；在教育项目中参与学习互动、认知负荷与认知情感数据分析。','My work includes multimodal sentiment analysis and uncertainty modeling. In education research projects, I contribute to analyses of learning interaction, cognitive load, and cognitive–affective data.'),papers:[7,8,9]}
 ],
 vision:[
 {title:bi('人–AI 协同学习','Human–AI Collaborative Learning'),body:bi('未来拟探索学习者与 AI 智能体之间的认知分工、反思机制和协作过程，关注学习者如何保持能动性与自主判断。','I aim to explore cognitive division of labor, reflection, and collaboration between learners and AI agents, with attention to learner agency and independent judgment.')},
 {title:bi('持续性智能体学习支持','Agentic Learning Systems'),body:bi('未来拟从单次活动走向持续学习支持，研究多智能体的诊断、协作与干预机制，以及长期使用中的学习变化。','I aim to move from individual learning activities toward sustained support, examining multi-agent diagnosis, collaboration, intervention, and learning changes over time.')},
 {title:bi('动态个性化生成式学习','Personalized Generative Learning'),body:bi('未来拟结合认知、情感和行为状态，研究动态生成的问题、反馈与支架，并通过真实教学中的过程与结果证据评估其效果。','I aim to investigate dynamically generated questions, feedback, and scaffolds informed by cognitive, affective, and behavioral states, evaluated through process and outcome evidence in educational settings.')}
 ],
 projectThemes:[[1,3],[8],[7],[4,6],[8],[7],[3,8],[1,9]]
};
})();
