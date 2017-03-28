variable "aws_region" {}
variable "vpc_id" {}
variable "ami_id" {}
variable "public_key" {}
variable "instance_type"  {}

provider "aws" {
    region = "${var.aws_region}"
}

data "aws_vpc" "selected" {
    id="${var.vpc_id}"
}

#data "aws_ami" "ubuntu" {
    #most_recent = true
    #filter {
        #name   = "name"
        #values = [""]
    #}
    #filter {
        #name   = "virtualization-type"
        #values = ["hvm"]
    #}
    #owners = ["099720109477"] # Canonical
#}

resource "aws_security_group" "gorilla_fan" {
    name        = "gorilla_fan"
    description = "Gorilla Fan Web Server Security Group"
    vpc_id      = "${data.aws_vpc.selected.id}"
    ingress{
        to_port     = 9090
        from_port   = 0
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress{
        to_port     = 22
        from_port   = 0
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

}

resource "aws_key_pair" "auth" {
    key_name   = "gorilla_iot"
    public_key = "${var.public_key}"
}

resource "aws_instance" "web" {
    ami                     = "${var.ami_id}"
    instance_type           = "${var.instance_type}"
    key_name                = "gorilla_iot"
    disable_api_termination = false
    iam_instance_profile    = "ecsInstanceRole"

    tags {
        Name = "gorilla_iot"
    }
    vpc_security_group_ids = ["${aws_security_group.gorilla_fan.id}"]

    provisioner "local-exec" {
        command = "sleep 6m && ansible-playbook -i ec2.py gorilla_iot.yml -u ec2-user"
    }
}

