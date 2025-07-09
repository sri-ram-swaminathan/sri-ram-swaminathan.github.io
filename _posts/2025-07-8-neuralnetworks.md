---
title: "Neural Networks from scratch"
categories:
  - Technical 
toc: true
toc_sticky: true
toc_title: "Contents"
---

> A neural network built from the ground up to solve digit recognition. I motivate theory and follow it up with code implementations. An in depth study of the 4 equations of backpropagation is provided at the end.  

# What's wrong with classical machine learning? 

![](/assets/img/nn/mnist_example.png)
 
Identifying these images is a trivial task for humans. But just imagine trying to write a program to make a computer do the same, the many rules you would need to define: "A 9 has a loop and a straight line below it", "Two loops on top of each other make an eight", ... and the list goes on and on

And this is just for 9 digits. Imagine the complexity of rule-based system for self-driving cars! 

The classical machine learning algorithms we have seen so far, from [Linear Regression](https://sriramswaminathan.com/technical/ch3/) till [Support Vector Machines](https://sriramswaminathan.com/technical/ch9/) have been interpretable. And while they are machine learning in the sense that they get better with data, superior performance is found by hand-crafting features and rules, turning knobs and dials based on human knowledge. 

Neural networks are based on a completely different type of learning algorithm. One in which the tweaks to the parameters of the network are built into the learning algorithm. We completely do away with rules and interpretability, trading it on for an unbiased system that can learn most non-linear functions out there. The drawback being that it requires large data & compute, explaining why neural networks only gained traction from 2006 while the algorithms were developed all they way back in 1980. 


# Making predictions 

A neural network is just another function estimator (albeit a good one), it takes in some input and creates some output. The structure / method in which a neural network is shown below: 

A bunch of linear functions can only approximate a linear function. This idea is explained beautifully in this [short video](https://youtu.be/0QczhVg5HaI?si=tlQd5r9SrEp_MfvP) by Emergent Garden. 

However, most relationships between predictors and response tend to be non-linear. And so we introduce a non-linearity. 

The final output of the weighted sum of inputs, is therefore made to be 

![](/assets/img/nn/activations.jpg)
Some of the most popular activation functions. 

We will stick to the sigmoid "squishification" function. Coding it up is straightfoward, and we store it's derivative too, for reasons we will see soon. 

```python
def sigmoid(z):
    return 1 / (1+exp(z))

def sigmoid_prime(z):
    return sigmoid(z) * (1 - sigmoid(z))
```

These two ideas, (i) multiple connected neurons and (ii) non-linear predictions, combine in such a way that a neural network can predict complex non-linear functions using very simple single non-linear blocks. 

Let's walk through a grossly oversimplified neural network that classifies a dog as cute or not, taking in as input the size of the dog's eyes in the picture. 



# How will it learn? 

Every good machine learning algorithm needs a loss function, a way to quantify it's performance, and get better. Here, since we are trying to classify digits, classification accuracy could be a good choice right? Well ... not exactly, we would like to impose three main conditions: 

1. The cost function can be written as an average $C = \frac{1}{n} \sum_{x=1}^{n} C_{x}$ where $C_{x}$ is the cost per training example 

2. The cost function can be written as a function of the outputs of the network 

3. The cost function is "smooth" or continuous, so that small changes in the input produce small changes in the output

With all these ideas in place, the mean squared error loss, is a good loss function.  

$$ 
L = \frac{1}{n} \sum_{i}^{n} (\hat{y}-y)^{2}
$$

In our case, this would measure how far away our estimates are, by calculating the difference in predicted activation responses to true activation responses. 

# Backpropogation under the hood


## Notation and equations 

Now comes the scary calculus :') Let's start by discussing notation, like good math boys. 

The weight connecting the $k^{th}$ neuron in layer $l$ to the $j^{th}$ neuron in layer $l-1$ is denoted by $w_{jk}^{l}$. The bias of the $j^{th}$ neuron in the $l^{th}$ layer is given by $b_{j}^{l}$. Similarly activation of the $j^{th}$ neuron in the $l^{th}$ layer is given by $a_{j}^{l}$

Phew that was a lot, let's take a simple example and make sense of it. Assume a neural network with very many layers. For the time being we only care about layers 4 and 5 which are shown below

![](/assets/img/nn/nn%20matrix.jpg)

Let's compute the activation at layer 5: 

$$

a_{1}^{5} = \sigma(\color{Blue}{w_{11}^{5}a_{1}^{4}} \hspace{2mm} \color{Black}{+} \hspace{2mm} \color{Green}{w_{12}^{5}a_{2}^{4}} \hspace{2mm} \color{Black}{+} \hspace{2mm} \color{Orange}{w_{13}^{5}a_{3}^{4}} \hspace{2mm} \color{Black}{+} \hspace{2mm} b_{1}^{5})
\\
\\
a_{2}^{5} = \sigma(\color{Blue}{w_{21}^{5}a_{1}^{4}} \hspace{2mm} \color{Black}{+} \hspace{2mm} \color{Green}{w_{22}^{5}a_{2}^{4}} \hspace{2mm} \color{Black}{+} \hspace{2mm} \color{Orange}{w_{23}^{5}a_{3}^{4}} \hspace{2mm} \color{Black}{+} \hspace{2mm} b_{2}^{5})
$$

Since these are linear equations (aside from the sigmoid) we can represent this using a matrix

$$

\begin{pmatrix}
   a_{1}^{5} \\
   a_{2}^{5}
\end{pmatrix}
=
\sigma 

\left\{

\begin{pmatrix}

\color{Blue}{w_{11}^{5}} & \color{Green}{w_{12}^{5}} & \color{Orange}{w_{13}^{5}}\\
\color{Blue}{w_{21}^{5}} & \color{Green}{w_{22}^{5}} & \color{Orange}{w_{23}^{5}} 

\end{pmatrix}

\cdot 

\begin{pmatrix}

\color{Blue}{a_{1}^{4}} \\
\color{Green}{a_{2}^{4}} \\
\color{Orange}{a_{3}^{4}}
\end{pmatrix}
 +
 \begin{pmatrix}
b_{1}^{5}\\
b_{2}^{5}

 \end{pmatrix}
\right\}
$$

Ah, written this way it's easy to see that the activation for neuron i is simply a sum of all the weights that lead to i times their corresponding activations. Plus an additional bias ofcourse. 

$a_{j}^{l} = \sigma(\sum_{k} w_{jk}a_{k}^{l-1} + b_{j}^{l}) = \sigma(z_{j}^{l})$

Here $z_{j}^{l}$ is an intermediate variable representing the input that neuron $j$ at layer $l$ receives. 

The program of backpropogation is to find the gradient of the cost function with respect to the weights and biases. The hope then is to adjust those weights and biases by nudging them in the direction opposite to the gradient. 

Since, the weights and biases we need are all captured in $z_{j}^{l}$. We can first see how making a small change to the input to the neuron, $z_{j}^{l} + \color{Blue}\Delta z_{j}^{l}$ affects the final cost, then work our way back to catch the responsible weights and biases. 

Therefore, we define the error of neuron $j$ at layer $l$ to be $\delta_{j}^{l} = \frac{\partial C}{\partial z_{j}^{l}}$. We will the use some calculus to derive $\frac{\partial C}{\partial w_{jk}^{l}}$ and $\frac{\partial C}{\partial b_{j}^{l}}$ 

Backpropogation relies heavily on the idea of the [chain rule](https://en.wikipedia.org/wiki/Chain_rule). Here is an intuitive explanation of the main idea: "If a car travels twice as fast as a bicycle and the bicycle is four times as fast as a walking man, then the car travels 2 × 4 = 8 times as fast as the man." - George F. Simmons

Let's collect everything we have seen so far, and how each part is connected to the rest. This helped me understand the entire process deeper, and was especially useful during the proofs.  

![](/assets/img/nn/tree.png)
The many moving parts and their relations. Credit: [3Blue1Brown](https://www.3blue1brown.com/lessons/backpropagation-calculus)

Without further ado, the four equations of backpropagation are: 


The error in the output layer 

$$

\begin{equation}

\delta_{j}^{L} = \frac{\partial C}{\partial a_{j}^{L}} \cdot \sigma'(z_{j}^{L})


\end{equation}

$$

The error in layer $l$ as a function of the error in layer $l+1$ 

$$
\begin{equation}
\delta_{j}^{l} = \sum_{k} w_{kj}^{l+1} \delta_{k}^{l+1} \cdot \sigma'(z_{j}^{l})
\end{equation}

$$

The gradient of the cost with respect to the bias 

$$
\begin{equation}
\frac{ \partial C}{\partial b_{j}^{l}} = \delta_{j}^{l}
\end{equation}

$$

The gradient of the cost with respect to the weight

$$
\begin{equation}

\frac{ \partial C}{\partial w_{jk}^{l}} = \delta_{j}^{l}  \cdot a_{k}^{l-1}
\end{equation}

$$


## Proofs


> Equation 1

We know how the cost relates to the final activation, and how the activation relates to it's input. In particular: 

$ C = \frac{1}{2} \parallel y - a_{j}^{L} \parallel^{2}$ where $a_{j}^{L}=\sigma(z_{j}^{L})$

Applying the chain rule we get that 

$\frac{\partial C}{\partial z_{j}^{L}} = \frac{\partial C}{ \partial a_{j}^{L}} \cdot \frac{\partial a_{j}^{L}}{\partial z_{j}^{L}} = \frac{\partial C}{ \partial a_{j}^{L}} \cdot \sigma'(z_{j}^{L})$ 

> Equation 2 

This is a little trickier. We need to think about how the error at layer $l$ propagates to the next layer. Let's visualize what's happening

![](/assets/img/nn/BP2.jpg)

As can be seen above, the first neuron of the first layer is connected to **all** the neurons in the next layer. Hence, making a small change to it's input will affect the inputs to all the neurons of the next layer. 

Now, our task is to rewrite $\delta_{j}^{l}$ in terms of $\delta_{k}^{l+1}$. Using what we saw above, 

$\delta_{j}^{l}= \frac{\partial C}{\partial z_{j}^{l}} = \sum_{k}\frac{\partial C}{\partial z_{k}^{l+1}} \cdot \frac{\partial z_{k}^{l+1}}{\partial z_{j}^{l}} = \sum_{k} \delta_{k}^{l+1} \cdot \frac{\partial z_{k}^{l+1}}{\partial z_{j}^{l}}$

This is saying that the rate of change of the error at layer $l$ is given by the sum of the rate of change of errors of all the inputs it affects in the next layer. 

All that's left to to is compute the term on the right. We start by rewriting the input to layer $l+1$ in terms of the input to layer $l$, in particular

$ z_{k}^{l+1} = \sum_{j} w_{kj}^{l+1} a_{j}^{l} + b_{k}^{l+1} =  \sum_{j} w_{kj}^{l+1} \sigma(z_{j}^{l}) + b_{k}^{l+1}$

Aha we have it now, on differentiating we obtain:

$\frac{\partial z_{k}^{l+1}}{\partial z_{j}^{l}} = w_{kj}^{l+1} \sigma'(z_{j}^{l})$

Substituting it back proves the second equation 

$\delta_{j}^{l} = \sum_{k} w_{kj}^{l+1} \delta_{k}^{l+1} \cdot \sigma'(z_{j}^{l})$

> Equations 3 and 4 

Recall that $\delta_{j}^{l} = \frac{\partial C}{\partial z_{j}^{l}}$, where $z_{j}^{l} = \sum_{k} w_{jk}^{l} a_{k}^{l-1} + b_{j}^{l}$ 

All we need to do now is follow the appropriate chain, once to the bias and once to the weight

$\frac{\partial C}{\partial b_{j}^{l}} = \frac{\partial C}{\partial z_{j}^{l}} \cdot \frac{\partial z_{j}^{l}}{\partial b_{j}^{l}} = \delta_{j}^{l} \cdot 1$ 

$\frac{\partial C}{\partial w_{jk}^{l}} = \frac{\partial C}{\partial z_{j}^{l}} \cdot \frac{\partial z_{j}^{l}}{\partial w_{jk}^{l}} = \delta_{j}^{l} \cdot a_{k}^{l-1}$  

## Algorithm

With the four equations in place, I hope it's clear why it's called "back"propagation. We first compute the activations forward, and then start at the error of the final layer, then use that to compute the errors of all the previous layers, one by one. With the errors in place, we find out the gradient of the cost with respect to all the weights and biases. 

Here's the logic in pseudocode:

1. Input layer : compute the first activation $a^{1}$

2. Feedforward: compute $z^{l} = w^{l}a^{l-1} + b^{l}$ and $a^{l}=\sigma(z^{l})$ for $l=2,3,...L$

3. Output error: compute $\delta_{j}^{L} = \frac{\partial C}{\partial a_{j}^{L}} \cdot \sigma'(z_{j}^{L})$ at the last layer 

4. Backpropagate the error: for each layer $l=L-1, L-2, ... 2$ compute $\delta_{j}^{l} = \sum_{k} w_{kj}^{l+1} \delta_{k}^{l+1} \cdot \sigma'(z_{j}^{l})$

5. Gradient: use the error vector for each layer to find $\frac{ \partial C}{\partial b_{j}^{l}}$ and $\frac{ \partial C}{\partial w_{jk}^{l}}$ 


# Resources 

It took me ~24 hours (over two weeks) to understand everything that is in this post. This is a heavily condensed version of the many things I've learnt. 

I learnt all the things I needed (code, theory and intuition) from free resources on the internet. The quality of information available online is baffling, I am deeply grateful for their work. In no particular order here are the awesome resources I used: 

- [Michael Nielsen](http://neuralnetworksanddeeplearning.com/): best introductory text for theory
-  [3Blue1Brown](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi): the undisputed king of visuals and intuition 
- [Andrej Karpathy](https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ): you will atually enjoy coding and debugging  
- [Sebastian Lague](https://youtu.be/hfMk-kjRv4c?si=G0vIZdvDvSeiPuzN): a very elaborate and detailed experiment, taught from first principles & explained marvelously 