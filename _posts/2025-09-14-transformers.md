---
title: "Attention is all you need from scratch"
categories:
  - Technical 
toc: true
toc_sticky: true
toc_title: "Contents"
---

> The original encoder-decoder transformer architecture used for translating english to german from the ground up. Just enough theory and code to get by. 

# Natural Language Processing 

“Time flies like an arrow. Fruit flies like a banana.” A human reads that sentence, chuckles at the pun, and instantly grasps the shift in meaning of the word flies. For a computer, though, this is pure chaos. Is “fruit flies” a command? Are “time” and “fruit” comparable objects? Parsing such ambiguities is at the heart of Natural Language Processing (NLP)—the field that teaches machines to make sense of human language.

NLP powers everything from autocorrect and spam filters to chatbots, translation systems, and voice assistants. The challenge is that language is messy: words shift meaning with context, grammar is full of exceptions, and human expression thrives on nuance, metaphor, and play. Teaching machines to deal with all that has been a decades-long journey.

For much of the 2010s, the dominant workhorses of NLP were Recurrent Neural Networks (RNNs). RNNs process language sequentially, word by word, passing along a hidden state that captures information about what’s come before. The idea is elegant: read a sentence as a chain, building memory as you go.

But plain RNNs struggled to remember information across long stretches of text. To address this, researchers introduced Long Short-Term Memory networks (LSTMs). LSTMs added gates—mechanisms to decide what to remember, what to forget, and what to pass forward—allowing them to keep track of longer contexts. LSTMs unlocked big leaps in machine translation, speech recognition, and sentiment analysis.

Still, these models carried three major shortcomings:

- Exploding and vanishing gradients: When training RNNs and LSTMs, the math that updates their weights often spiraled out of control (exploding) or shrank to nothing (vanishing). This made it hard to learn long-range patterns.

- Sequential processing is slow: Because they read text one word at a time, RNNs and LSTMs couldn’t take full advantage of parallel computing power. Training them on large datasets was painfully inefficient.

- Long-range dependencies are tough: Even with LSTMs’ gating mechanisms, the models struggled to capture relationships between words far apart in a sentence. Understanding “The book I borrowed last month from the library is overdue” requires linking “book” to “overdue” across a long gap—something these architectures found difficult.

In 2017, the breakthrough came with the paper Attention Is All You Need. The transformer architecture flipped NLP on its head. Instead of processing sentences sequentially, transformers use self-attention, a mechanism that lets every word in a sentence look directly at every other word. Suddenly, “book” can attend to “overdue” no matter how far apart they are, without relying on a fragile memory state.

The impact they've had is tremendous. The transformer architecture forms the backbone for the modern machine learning, for language (GPT-5) and vision (Dinov3) models alike. Serendiptiously, they showed emergent behaviors, gaining abilities they weren't trained or expected to do, with increasing size. In this article, we look at the original transformer architecture and also implement it in code. 

# Architecture and broad overview 

A transformer is simply a next-word prediction machine, (albeit astonishingly good) given some previous words. It's made up of essentially two chunks, as shown below.   

![](/assets/img/transformers/overview.jpg)


In the following sections we look at each of these components in detail. 

# Building blocks 

## Embeddings 

Machines don't do text, they do numbers. 

## Attention 
 

## Encoder 

## Decoder 

## Putting it all together 

# Concluding thoughts 

While the architecture is itself super important, it isn't everything. Training neural networks is a non-trivial and crucial step for the proper functioning of neural networks. And as it turns out, catching bugs can be very convoluted (pun intended) and recreating cutting edge results as not as easy as it seems. A good chunk of the things I learnt about neural network training from [Andrej's excellent course](https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ) was omitted for brevity's sake. However, here is an article summarizing his pipeline: [A recipe for training neural networks](https://karpathy.github.io/2019/04/25/recipe/). 

In no particular order, here are some of the resources without which I wouldn't be here: 

- [3Blue1Brown](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi) (the og) 
- [Umar Jamil](https://youtu.be/bCz4OMemCcA?feature=shared) (excellent explanation)
- [Gal Lahat](https://youtu.be/RNF0FvRjGZk?feature=shared) (beautiful visualization of attention)
- [Sebastian Raschka](https://github.com/rasbt/LLMs-from-scratch) (most complete resource for understanding LLM and their training process)
- [Jay Alammar](https://jalammar.github.io/illustrated-transformer/) (detailed writing, with good visuals)

Also, the entire introduction to this post was written by ChatGPT (how meta) :D