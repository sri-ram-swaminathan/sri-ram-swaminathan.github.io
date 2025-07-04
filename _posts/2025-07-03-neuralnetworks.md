---
title: "Neural Networks from scratch"
categories:
  - Technical 
toc: true
toc_sticky: true
toc_title: "Contents"
---

> Here, I build a neural network from scratch, training it to solve the classical problem of handwritten digit classification. I motivate theory and directly follow it up with code. An in depth description of backpropogation is added towards the end. 

# What's wrong with classical machine learning? 

# Making predictions 



![](/assets/img/nn/activations.jpg)
Some of the most popular activation functions. 

We will stick to the sigmoid "squishification" function. Coding it up is straightfoward, and we store it's derivative too, for reasons we will see soon. 

```python
def sigmoid(z):
    return 1 / (1+exp(z))

def sigmoid_prime(z):
    return sigmoid(z) * (1 - sigmoid(z))
```

The digit is simply the neuron with highest activation. 

# How will it learn? 

Every good machine learning algorithm needs a loss function, a way to quantify it's performance, and get better. Here, since we are trying to classify digits, classification accuracy could be a good choice right? Well ... not exactly, remember how we want to see small changes in the output as we make small changes to the input? That only works if our loss function is "smooth", or more formally continuous. 

So, we stick to the mean squared loss. The formula for which is 

$$ 
L(w,b) = \frac{1}{n} \sum_{i}^{n} (\hat{y}-y)^{2}
$$


# Backpropogation up close 

Now comes the scary calculus :') Let's start by discussing notation, like good math boys. 

Phew that was a lot, let's take a simple example and make sense of it. This will also help us express it in matrix notation. Assume some neural network with some very may layers, for the time being we only care about layers 4 and 5 which are shown below. 

![](/assets/img/nn/nn%20matrix.jpg)

Here $\color{Orange}{w_{11}^{5}}$





# Resources 

I learnt all the things I needed (code, theory and intuition) from free resources on the internet. The quality of information available online is baffling, I am deeply grateful for their work. In no particular order here are the awesome resources I used: 

- [Michael Nielsen](http://neuralnetworksanddeeplearning.com/): best introductory text for theory
-  [3Blue1Brown](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi): the undisputed king of visuals and intuition 
- [Andrej Karpathy](https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ): you will atually enjoy coding and debugging  
- [Sebastian Lague](https://youtu.be/hfMk-kjRv4c?si=G0vIZdvDvSeiPuzN): a very elaborate and detailed experiment, taught from first principles