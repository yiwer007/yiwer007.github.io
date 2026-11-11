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
 {title:bi('生成式 AI 教育应用','Generative AI in Education'),question:bi('如何将生成式 AI 融入教学与学习，促进思考、反思与创造？','How can generative AI support thinking, reflection, and creativity in teaching and learning?'),body:bi('围绕生成式 AI 学习环境设计、教学活动组织与反馈支持，研究不同应用方式对元认知、高阶思维和学习表现的影响，并通过教学实验与学习过程数据评估其效果。','I investigate the design of generative AI learning environments, learning activities, and feedback, examining their effects on metacognition, higher-order thinking, and learning performance through educational experiments and learning process data.'),papers:[1,3,8,9]},
 {title:bi('智能体支持学习','Agent-Supported Learning'),question:bi('如何通过智能体的角色分工与协作，为学习活动提供有效支持？','How can agent roles and collaboration effectively support learning activities?'),body:bi('研究单智能体与多智能体支持下的学习活动设计、动机支持和学习互动，关注不同角色与交互方式对学习过程及学习表现的影响。','I study learning activity design, motivational support, and interaction in single- and multi-agent environments, examining how agent roles and interaction patterns shape learning processes and performance.'),papers:[4,6]},
 {title:bi('个性化学习与问题式学习','Personalized Learning & Problem-Based Learning'),question:bi('如何围绕真实问题，为不同学习者提供适切的问题、反馈与学习支架？','How can problems, feedback, and scaffolds address individual needs within problem-based learning?'),body:bi('结合学习者差异与问题式学习活动，研究个性化问题生成、学习支架和反馈设计，考察这些支持方式如何促进问题理解、自主探究与学习表现。','I investigate personalized question generation, scaffolding, and feedback in problem-based learning, considering learner differences and examining how these supports contribute to problem understanding, independent inquiry, and learning performance.'),papers:[5,3,8]},
 {title:bi('学习者建模','Learner Modeling'),question:bi('如何结合行为与多模态信息，理解学习者的认知、情感和参与状态？','How can behavioral and multimodal information help us understand learners’ cognitive, affective, and engagement states?'),body:bi('关注学习者状态的表征与解释，结合学习行为、交互与注意分配等信息理解个体差异，为适切的学习支持提供依据。相关研究基础包括多模态情感与不确定性建模，以及学习参与、反馈采纳和注意分配的实证分析。','I focus on representing and interpreting learner states, using behavior, interaction, and attention to understand individual differences and inform learning support. Related foundations include multimodal sentiment and uncertainty modeling, alongside empirical analyses of engagement, feedback uptake, and attention allocation.'),papers:[7,8,9]}
 ],
 vision:[
 {title:bi('人–AI 协同学习','Human–AI Collaborative Learning'),body:bi('未来拟探索学习者与 AI 智能体之间的认知分工、反思机制和协作过程，关注学习者如何保持能动性与自主判断。','I aim to explore cognitive division of labor, reflection, and collaboration between learners and AI agents, with attention to learner agency and independent judgment.')},
 {title:bi('持续性智能体学习支持','Agentic Learning Systems'),body:bi('未来拟从单次活动走向持续学习支持，研究多智能体的诊断、协作与干预机制，以及长期使用中的学习变化。','I aim to move from individual learning activities toward sustained support, examining multi-agent diagnosis, collaboration, intervention, and learning changes over time.')},
 {title:bi('动态个性化生成式学习','Personalized Generative Learning'),body:bi('未来拟结合认知、情感和行为状态，研究动态生成的问题、反馈与支架，并通过真实教学中的过程与结果证据评估其效果。','I aim to investigate dynamically generated questions, feedback, and scaffolds informed by cognitive, affective, and behavioral states, evaluated through process and outcome evidence in educational settings.')}
 ],
 projectThemes:[[1,3],[3],[7],[4,6],[8],[3,4],[1,9],[1,8,9]]
};
})();
