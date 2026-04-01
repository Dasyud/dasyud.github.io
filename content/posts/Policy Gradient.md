---
title: Policy Gradient
draft: true
tags: 
  - reinforcement-learning
---

$$J(\theta) \propto \sum_{s}\mu(s)\sum_{a}\nabla \pi(a|s)q_{\pi}(s,a)$$
or
$$\nabla_{\theta} J(\theta) \propto \int_{\mathcal{S}}\mu(s)\int_{\mathcal{A}}\nabla_{\theta} \pi(a|s, \theta)q_{\pi}(s,a)dads$$

A first algorithm
$$
\nabla J_{\theta} = \mathbb{E}_{\pi}\left[ \sum_{a} q_{\pi}(s, a) \nabla{\pi}(a|S_{t}, \theta) \right]
$$
$$
\theta_{t+1} = \theta_{t} + \alpha\left[ \sum_{a} q_{\pi}(s, a, \hat{w}) \nabla{\pi}(a|S_{t}, \theta) \right]
$$
REINFORCE
$$
\nabla J_{\theta} = \mathbb{E}_{\pi}\left[ \sum_{a} q_{\pi}(s, a) \nabla{\pi}(a|S_{t}, \theta) \right]
$$
$$
= \mathbb{E}_{\pi}\left[  q_{\pi}(s, a) \frac{\nabla{\pi}(a|S_{t}, \theta)}{\pi(a|s, \theta)} \right]
$$

Deterministic PG Theorem
$$
\nabla_{\theta}J(\pi_{\theta}) = \int_{S}\mu(s)^\gamma \int_{A}q_{\pi}(s,a)\nabla_{\theta}\pi(s, a)
$$

Off-policy PG

Deterministic PG